"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaQueryBuilder = void 0;
class PrismaQueryBuilder {
    constructor(query) {
        this.query = query;
        this.prismaQuery = {};
    }
    filter() {
        const _a = this.query, { searchTerm, sort, fields, page, limit } = _a, filters = __rest(_a, ["searchTerm", "sort", "fields", "page", "limit"]);
        if (Object.keys(filters).length > 0) {
            this.prismaQuery.where = Object.entries(filters).reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: { equals: value } })), {});
        }
        return this;
    }
    search(searchableFields) {
        const searchTerm = this.query.searchTerm;
        if (searchTerm) {
            this.prismaQuery.where = Object.assign(Object.assign({}, this.prismaQuery.where), { OR: searchableFields.map((field) => ({
                    [field]: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                })) });
        }
        return this;
    }
    sort() {
        const sortParam = this.query.sort || "createdAt";
        const order = sortParam.startsWith("-") ? "desc" : "asc";
        const field = sortParam.replace("-", "");
        this.prismaQuery.orderBy = {
            [field]: order,
        };
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.prismaQuery.skip = skip;
        this.prismaQuery.take = limit;
        return this;
    }
    fields() {
        var _a;
        const fields = (_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(",").reduce((acc, field) => {
            acc[field] = true;
            return acc;
        }, {});
        if (fields)
            this.prismaQuery.select = fields;
        return this;
    }
    build() {
        return this.prismaQuery;
    }
}
exports.PrismaQueryBuilder = PrismaQueryBuilder;
