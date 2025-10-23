"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = exports.getAllBlogs = void 0;
const db_1 = require("../../../config/db");
const QueryBuilder_1 = require("../../../utils/QueryBuilder");
const createBlog = (payload, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.blog.create({
        data: {
            title: payload.title,
            slug: payload.slug,
            content: payload.content,
            thumbnail: payload.thumbnail,
            tags: payload.tags,
            author: {
                connect: { id: authorId }, // 🔗 connect user
            },
        },
    });
    return result;
});
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const builder = new QueryBuilder_1.PrismaQueryBuilder(query)
        .filter()
        .search(["title", "slug", "content"])
        .sort()
        .paginate()
        .fields();
    const prismaArgs = builder.build();
    // Fetch data and total count in parallel
    const [data, total] = yield Promise.all([
        db_1.prisma.blog.findMany(Object.assign(Object.assign({}, prismaArgs), { include: { author: true } })),
        db_1.prisma.blog.count({ where: prismaArgs.where }),
    ]);
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const totalPage = Math.ceil(total / limit);
    return {
        meta: { page, limit, total, totalPage },
        data,
    };
});
exports.getAllBlogs = getAllBlogs;
const getBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.blog.findUnique({
        where: { id },
        include: { author: true },
    });
    return result;
});
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.blog.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.blog.delete({
        where: { id },
    });
    return result;
});
exports.BlogService = {
    createBlog,
    getAllBlogs: exports.getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
};
