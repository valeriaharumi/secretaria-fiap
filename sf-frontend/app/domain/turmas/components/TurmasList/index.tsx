import React, { useCallback, useEffect, useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { Table, Flex, Button } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import TurmasForm from '../TurmasForm';
import { ITurmaData } from '../../entities';
import { genericNotification } from '@/app/domain/shared/components/notification/genericNotification';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
    name: string;
    description: string;
    code: string;
    type: number;
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
        title: 'Nome',
        dataIndex: 'name',
        width: '30%',
    },
    {
        title: 'Descrição',
        dataIndex: 'description',
        width: '35%',
    },
    {
        title: 'Código',
        dataIndex: 'code',
        width: '10%',
    },
    {
        title: 'Tipo',
        dataIndex: 'tipo',
        width: '15%',
        render: (tipo) => {
            return (tipo.name)
        }
    }
];

const TurmasList: React.FC = () => {
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
            const response = await fetch(`http://localhost/turmas?page=${tableParams.pagination.current}`);
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
    const [editingTurma, setEditingTurma] =
        useState<IAlunoData | null>(null);

    const handleEdit = (turma: ITurmaData) => {
        console.log("Editing turma:", turma);
        setEditingTurma(turma);
        setIsOpen(true);
    };

    async function handleDelete(id: number) {
        try {
            const response = await fetch(`http://localhost/turmas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Erro ao excluir turma: ${response.statusText}`);
            }
            genericNotification({
                message: "Turma excluída com sucesso",
                type: "success",
            });
        } catch (error) {
            console.error('Erro na exclusão da turma:', error);
            genericNotification({
                message: "Falha ao excluir turma",
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
            <TurmasForm
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
                turmaData={editingTurma}
            />
        </>
    );
};

export default TurmasList;