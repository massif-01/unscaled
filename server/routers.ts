import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
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

// ── Admin guard ─────────────────────────────────────────────────────────────────
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin only" });
  }
  return next({ ctx });
});

// ── Nav Nodes Router ─────────────────────────────────────────────────────────────────
const nodesRouter = router({
  list: publicProcedure.query(() => getVisibleNavNodes()),
  listAll: adminProcedure.query(() => getAllNavNodes()),
  create: adminProcedure
    .input(z.object({
      label: z.string().min(1).max(64),
      url: z.string().min(1).max(512),
      icon: z.string().max(16).optional(),
      sortOrder: z.number().int().default(0),
      visible: z.boolean().default(true),
      posX: z.string().optional(),
      posY: z.string().optional(),
    }))
    .mutation(async ({ input }) => { await createNavNode(input); return { success: true }; }),
  update: adminProcedure
    .input(z.object({
      id: z.number().int(),
      label: z.string().min(1).max(64).optional(),
      url: z.string().min(1).max(512).optional(),
      icon: z.string().max(16).nullable().optional(),
      sortOrder: z.number().int().optional(),
      visible: z.boolean().optional(),
      posX: z.string().nullable().optional(),
      posY: z.string().nullable().optional(),
    }))
    .mutation(async ({ input }) => { const { id, ...data } = input; await updateNavNode(id, data); return { success: true }; }),
  delete: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => { await deleteNavNode(input.id); return { success: true }; }),
});

// ── Content Router ─────────────────────────────────────────────────────────────────
const contentRouter = router({
  list: publicProcedure
    .input(z.object({ category: z.string().optional() }))
    .query(({ input }) => getVisibleContentItems(input.category)),
  listAll: adminProcedure
    .input(z.object({ category: z.string().optional() }))
    .query(({ input }) => getAllContentItems(input.category)),
  create: adminProcedure
    .input(z.object({
      category: z.string().min(1).max(64),
      title: z.string().min(1).max(256),
      description: z.string().optional(),
      url: z.string().min(1).max(512).optional(),
      coverUrl: z.string().min(1).max(512).optional(),
      publishedAt: z.date().optional(),
      visible: z.boolean().default(true),
      sortOrder: z.number().int().default(0),
    }))
    .mutation(async ({ input }) => { await createContentItem(input); return { success: true }; }),
  update: adminProcedure
    .input(z.object({
      id: z.number().int(),
      category: z.string().min(1).max(64).optional(),
      title: z.string().min(1).max(256).optional(),
      description: z.string().nullable().optional(),
      url: z.string().min(1).max(512).nullable().optional(),
      coverUrl: z.string().min(1).max(512).nullable().optional(),
      publishedAt: z.date().nullable().optional(),
      visible: z.boolean().optional(),
      sortOrder: z.number().int().optional(),
    }))
    .mutation(async ({ input }) => { const { id, ...data } = input; await updateContentItem(id, data); return { success: true }; }),
  delete: adminProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ input }) => { await deleteContentItem(input.id); return { success: true }; }),
});

// ── RSS Router ─────────────────────────────────────────────────────────────────
const rssRouter = router({
  list: publicProcedure
    .input(z.object({ limit: z.number().int().min(1).max(100).default(50) }))
    .query(({ input }) => getVisibleRssItems(input.limit)),
});

// ── App Router ─────────────────────────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  nodes: nodesRouter,
  content: contentRouter,
  rss: rssRouter,
});

export type AppRouter = typeof appRouter;
