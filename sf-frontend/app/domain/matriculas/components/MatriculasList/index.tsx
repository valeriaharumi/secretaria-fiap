import React, { useCallback, useEffect, useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { Table, Flex, Button } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { IAlunoData } from '../../entities';
import { genericNotification } from '@/app/domain/shared/components/notification/genericNotification';
import MatriculaForm from '../MatriculaForm';
import { ITurmaData } from '@/app/domain/turmas/entities';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
    aluno: IAlunoData;
    turma: ITurmaData;
    registroMatricula: string;
    id: number
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<any>['field'];
    sortOrder?: SorterResult<any>['order'];
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Aluno',
        dataIndex: 'aluno',
        width: '30%',
        render: (aluno) => {
            return (aluno.name)
        }
    },
    {
        title: 'Turma',
        dataIndex: 'turma',
        width: '30%',
        render: (turma) => {
            return (turma.name)
        }
    },
    {
        title: 'Registro de matrícula',
        dataIndex: 'registro_matricula',
        width: '20%',
    }
];

const MatriculasList: React.FC = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 5,
            showSizeChanger: false,
        },
    });

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost/matriculas?page=${tableParams.pagination.current}`);
            const result = await response.json();

            console.log('Dados recebidos:', result);

            if (result && result.data) {
                setData(result.data);
                setLoading(false);

                const plural = result.total > 1 ? "s" : "";
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: result.total,
                        showTotal: (total) => `${total} resultado${plural} encontrado${plural}`,
                    },
                });
            } else {
                console.error('Dados não encontrados na resposta:', result);
                setLoading(false);
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setLoading(false);
        }
    }, [tableParams.pagination]);

    useEffect(() => {
        fetchData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
    ]);

    const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const [editingMatricula, setEditingMatricula] =
        useState<IMatriculaData | null>(null);

    const handleEdit = (matricula: IMatriculaData) => {
        console.log("Editing aluno:", matricula);
        setEditingMatricula(matricula);
        setIsOpen(true);
    };

    async function handleDelete(id: number) {
        try {
            const response = await fetch(`http://localhost/matriculas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao deletar matrícula: ${response.statusText}`);
            }
            genericNotification({
                message: "Matrícula excluída com sucesso",
                type: "success",
            });
        } catch (error) {
            console.error('Erro na exclusão da matrícula:', error);
            genericNotification({
                message: "Falha ao excluir matrícula",
                type: "error",
            });
        }
    }

    return (
        <>
            <Table
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                columns={[
                    ...columns,
                    {
                        render: (text, record) => (
                            <Flex>
                                <Button onClick={() => handleEdit(record)} type="link">
                                    Editar
                                </Button>
                                <Button
                                    onClick={() => handleDelete(record.id)}
                                    type="link"
                                >
                                    Excluir
                                </Button>
                            </Flex>
                        ),
                    },
                ]}
            />
            <MatriculaForm
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                matriculaData={editingMatricula}
            />
        </>
    );
};

export default MatriculasList;