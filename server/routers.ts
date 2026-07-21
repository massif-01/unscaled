import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { getEnv } from "./env";
import { authenticateRequest, type AuthenticatedUser } from "./auth";
import {
  createContentItem,
  createNavNode,
  deleteContentItem,
  deleteNavNode,
  getAllContentItems,
  getAllNavNodes,
  getVisibleContentItems,
  getVisibleNavNodes,
  getVisibleRssItems,
  updateContentItem,
  updateNavNode,
} from "./db";

export type TrpcContext = { request: Request; user: AuthenticatedUser | null };

const t = initTRPC.context<TrpcContext>().create({ transformer: superjson });
export const router = t.router;
export const publicProcedure = t.procedure;
const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED", message: "Please login (10001)" });
  return next({ ctx: { ...ctx, user: ctx.user } });
});
const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.user.role !== "admin" || !getEnv().ADMIN_EMAIL) {
    throw new TRPCError({ code: "FORBIDDEN", message: "You do not have required permission (10002)" });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

export const appRouter = router({
  auth: router({
    me: publicProcedure.query(({ ctx }) => ctx.user),
    logout: publicProcedure.mutation(() => ({ success: true as const })),
  }),
  nodes: router({
    list: publicProcedure.query(() => getVisibleNavNodes()),
    listAll: adminProcedure.query(() => getAllNavNodes()),
    create: adminProcedure.input(z.object({
      label: z.string().min(1).max(64), url: z.string().min(1).max(512), icon: z.string().max(16).optional(),
      sortOrder: z.number().int().default(0), visible: z.boolean().default(true), posX: z.string().optional(), posY: z.string().optional(),
    })).mutation(({ input }) => createNavNode(input).then(() => ({ success: true as const }))),
    update: adminProcedure.input(z.object({
      id: z.number().int(), label: z.string().min(1).max(64).optional(), url: z.string().min(1).max(512).optional(),
      icon: z.string().max(16).nullable().optional(), sortOrder: z.number().int().optional(), visible: z.boolean().optional(),
      posX: z.string().nullable().optional(), posY: z.string().nullable().optional(),
    })).mutation(({ input }) => { const { id, ...data } = input; return updateNavNode(id, data).then(() => ({ success: true as const })); }),
    delete: adminProcedure.input(z.object({ id: z.number().int() })).mutation(({ input }) => deleteNavNode(input.id).then(() => ({ success: true as const }))),
  }),
  content: router({
    list: publicProcedure.input(z.object({ category: z.string().optional() })).query(({ input }) => getVisibleContentItems(input.category)),
    listAll: adminProcedure.input(z.object({ category: z.string().optional() })).query(({ input }) => getAllContentItems(input.category)),
    create: adminProcedure.input(z.object({
      category: z.string().min(1).max(64), title: z.string().min(1).max(256), description: z.string().optional(),
      url: z.string().min(1).max(512).optional(), coverUrl: z.string().min(1).max(512).optional(), publishedAt: z.date().optional(),
      visible: z.boolean().default(true), sortOrder: z.number().int().default(0),
    })).mutation(({ input }) => createContentItem(input).then(() => ({ success: true as const }))),
    update: adminProcedure.input(z.object({
      id: z.number().int(), category: z.string().min(1).max(64).optional(), title: z.string().min(1).max(256).optional(),
      description: z.string().nullable().optional(), url: z.string().min(1).max(512).nullable().optional(), coverUrl: z.string().min(1).max(512).nullable().optional(),
      publishedAt: z.date().nullable().optional(), visible: z.boolean().optional(), sortOrder: z.number().int().optional(),
    })).mutation(({ input }) => { const { id, ...data } = input; return updateContentItem(id, data).then(() => ({ success: true as const })); }),
    delete: adminProcedure.input(z.object({ id: z.number().int() })).mutation(({ input }) => deleteContentItem(input.id).then(() => ({ success: true as const }))),
  }),
  rss: router({
    list: publicProcedure.input(z.object({ offset: z.number().int().min(0).default(0), limit: z.number().int().min(1).max(100).default(10) })).query(({ input }) => getVisibleRssItems(input.limit, input.offset)),
  }),
});

export async function createContext(request: Request): Promise<TrpcContext> {
  try {
    return { request, user: await authenticateRequest(request) };
  } catch (error) {
    console.error("[Auth] request authentication failed", error);
    return { request, user: null };
  }
}

export type AppRouter = typeof appRouter;
