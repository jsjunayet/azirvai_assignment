import { Prisma } from "@prisma/client";

export class PrismaQueryBuilder<T> {
  private readonly query: Record<string, string>;
  private prismaQuery: Prisma.BlogFindManyArgs; // change "Project" to your model name

  constructor(query: Record<string, string>) {
    this.query = query;
    this.prismaQuery = {};
  }

  filter(): this {
    const { searchTerm, sort, fields, page, limit, ...filters } = this.query;

    if (Object.keys(filters).length > 0) {
      this.prismaQuery.where = Object.entries(filters).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: { equals: value },
        }),
        {}
      );
    }

    return this;
  }

  search(searchableFields: string[]): this {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      this.prismaQuery.where = {
        ...this.prismaQuery.where,
        OR: searchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
      };
    }
    return this;
  }

  sort(): this {
    const sortParam = this.query.sort || "createdAt";
    const order = sortParam.startsWith("-") ? "desc" : "asc";
    const field = sortParam.replace("-", "");

    this.prismaQuery.orderBy = {
      [field]: order,
    };

    return this;
  }

  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.prismaQuery.skip = skip;
    this.prismaQuery.take = limit;

    return this;
  }

  fields(): this {
    const fields = this.query.fields?.split(",").reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);

    if (fields) this.prismaQuery.select = fields;
    return this;
  }

  build(): Prisma.BlogFindManyArgs {
    return this.prismaQuery;
  }
}
