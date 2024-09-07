import { useEffect, useState } from "react";
import { Form, Drawer, Button, Input, DatePicker } from "antd";
import dayjs from 'dayjs';
import { ITurmaData } from "../../entities";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    turmaData?: ITurmaData;
};

export default function TurmasForm({
    isOpen,
    onClose,
    turmaData,
}: Props) {
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [form] = Form.useForm();

    const close = async () => {
        form.resetFields();
        onClose();
    };

    useEffect(() => {
        if (turmaData) {
            form.setFieldsValue({
                ...turmaData,
                birth_date: turmaData.birthDate ? dayjs(turmaData.birthDate) : null
            });
        }
    }, [isOpen, turmaData]);

    const isEditing = !!turmaData;

    const handleSubmit = async () => {
        if (isSubmitLoading) return;
        setIsSubmitLoading(true);

        try {
            const values = await form.validateFields();
            if (isEditing) {
                await updateTurma(values);
                genericNotification({
                    message: "Turma atualizado com sucesso",
                    type: "success",
                });
            } else {
                await createTurma(values);
                genericNotification({
                    message: "Turma cadastrado com sucesso",
                    type: "success",
                });
            }

            await close();
        } catch (error) {
            console.error("Falha ao salvar turma:", error);
            genericNotification({
                message: "Erro ao salvar o turma",
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
                    {isEditing ? "Editar turma" : "Cadastrar turma"}
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
                    rules={[{ required: true, message: "Por favor, insira o nome da turma" }]}
                >
                    <Input placeholder="Nome" maxLength={255} />
                </Form.Item>

                <Form.Item
                    label="Descrição"
                    name="description"
                    rules={[{ required: true, message: "Por favor, insira uma descrição da turma" }]}
                >
                    <Input placeholder="Descrição" maxLength={500} />
                </Form.Item>
            </Form>
        </Drawer>
    );
}

async function createTurma(values: any) {
    try {
        const response = await fetch('http://localhost/turmas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error(`Erro ao criar turma: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro na criação da turma:', error);
        throw error;
    }
}

async function updateTurma(values: any) {
    try {
        const { id, ...data } = values;
        const response = await fetch(`http://localhost/turmas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Erro ao atualizar turma: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro na atualização da turma:', error);
        throw error;
    }
}

function genericNotification(arg0: { message: string; type: string; }) {
    throw new Error("Function not implemented.");
}

