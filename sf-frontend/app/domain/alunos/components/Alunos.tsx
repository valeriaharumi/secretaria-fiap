"use client"

import { Button, Flex, Layout, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AlunosList from "./AlunosList";
import AlunoForm from "./AlunosForm";
import React, { useState } from "react";

const { Content } = Layout;
const { Title } = Typography;

function Alunos() {

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Content className="p-6">
                <Flex justify="space-between" className="mb-6">
                    <Title level={3}>Alunos</Title>
                    <Button
                        type="primary"
                        className="p-3"
                        icon={<PlusCircleOutlined />}
                        onClick={showDrawer}
                    >
                        Cadastrar aluno
                    </Button>
                    <AlunoForm isOpen={open} onClose={onClose} />
                </Flex>
                <AlunosList />
            </Content>
        </>
    )
}

export default Alunos;