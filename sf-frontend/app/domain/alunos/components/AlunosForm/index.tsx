import { useEffect, useState } from "react";
import { Form, Drawer, Button, Input, DatePicker, notification } from "antd";
import dayjs from 'dayjs';
import { IAlunoData } from "../../entities";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    alunoData?: IAlunoData;
};

export default function AlunoForm({
    isOpen,
    onClose,
    alunoData,
}: Props) {
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [form] = Form.useForm();

    const close = async () => {
        form.resetFields();
        onClose();
    };

    useEffect(() => {
        if (alunoData) {
            form.setFieldsValue({
                ...alunoData,
                birth_date: alunoData.birthDate ? dayjs(alunoData.birthDate) : null
            });
        }
    }, [isOpen, alunoData]);

    const isEditing = !!alunoData;

    const handleSubmit = async () => {
        if (isSubmitLoading) return;
        setIsSubmitLoading(true);

        try {
            const values = await form.validateFields();
            if (isEditing) {
                await updateAluno(values);
                genericNotification({
                    message: "Aluno atualizado com sucesso",
                    type: "success",
                });
            } else {
                await createAluno(values);
                genericNotification({
                    message: "Aluno cadastrado com sucesso",
                    type: "success",
                });
            }

            await close();
        } catch (error) {
            console.error("Falha ao salvar aluno:", error);
            genericNotification({
                message: "Erro ao salvar o aluno",
                type: "error",
            });
        } finally {
            setIsSubmitLoading(false);
        }
    };

    return (
        <Drawer
            title={
                <p className="text-lg">
                    {isEditing ? "Editar aluno" : "Cadastrar aluno"}
                </p>
            }
            placement="right"
            size="medium"
            onClose={close}
            open={isOpen}
            closable={false}
            footer={
                <div
                    className={`w-full flex gap-4 justify-end`}
                >
                    <Button onClick={close}>Cancelar</Button>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        disabled={isSubmitLoading}
                        loading={isSubmitLoading}
                    >
                        {isEditing ? "Salvar" : "Cadastrar"}
                    </Button>
                </div>
            }
        >
            <Form
                form={form}
                layout="vertical"
                autoComplete="off"
            >
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[{ required: true, message: "Por favor, insira o nome do aluno" }]}
                >
                    <Input placeholder="Nome" maxLength={255} />
                </Form.Item>

                <Form.Item
                    label="Data de Nascimento"
                    name="birthDate"
                    rules={[{ required: true, message: "Por favor, insira a data de nascimento" }]}
                >
                    <DatePicker format="DD/MM/YYYY" />
                </Form.Item>
            </Form>
        </Drawer>
    );
}

async function createAluno(values: any) {
    try {
        const response = await fetch('http://localhost/alunos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error(`Erro ao criar aluno: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro na criação do aluno:', error);
        throw error;
    }
}

async function updateAluno(values: any) {
    try {
        const { id, ...data } = values;
        const response = await fetch(`http://localhost/alunos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar aluno: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro na atualização do aluno:', error);
        throw error;
    }
}

function genericNotification(arg0: { message: string; type: string; }) {
    throw new Error("Function not implemented.");
}

