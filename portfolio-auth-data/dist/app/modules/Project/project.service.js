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
exports.ProjectService = void 0;
const db_1 = require("../../../config/db");
const createProject = (payload, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, "this is payload");
    const result = yield db_1.prisma.project.create({
        data: Object.assign(Object.assign({}, payload), { ownerId }),
    });
    console.log(result);
    return result;
});
const getAllProject = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.findMany({
        include: { owner: true },
        orderBy: { createdAt: "desc" },
    });
    return { data: result };
});
//....
const getProjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.findUnique({
        where: { id },
        include: { owner: true },
    });
    return result;
});
const updateProject = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield db_1.prisma.project.update({
        where: { id },
        data: payload,
    });
    return result;
});
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield db_1.prisma.project.delete({
        where: { id },
    });
    return data;
});
exports.ProjectService = {
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject,
};
