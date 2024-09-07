export interface IAluno {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    data?: IAlunoData[];
}

export interface IAlunoData {
    id?: number;
    name?: string;
    birthDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}