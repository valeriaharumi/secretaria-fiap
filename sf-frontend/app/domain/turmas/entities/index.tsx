export interface ITurma {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    data?: ITurmaData[];
}

export interface ITurmaData {
    id?: number;
    name?: string;
    description?: Date;
    code?: string;
    createdAt?: Date;
    updatedAt?: Date;
}