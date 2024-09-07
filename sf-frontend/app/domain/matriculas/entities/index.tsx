export interface IMatricula {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    data?: IMatriculaData[];
}

export interface IMatriculaData {
    id?: number;
    aluno?: IAlunoData;
    turma?: ITurmaData;
    registroMatricula?: string;
    birthDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}