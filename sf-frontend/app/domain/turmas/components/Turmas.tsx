"use client"

import { Button, Flex, Layout, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import TurmasList from "./TurmasList";
import TurmasForm from "./TurmasForm";
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
                    <Title level={3}>Turmas</Title>
                    <Button
                        type="primary"
                        className="p-3"
                        icon={<PlusCircleOutlined />}
                        onClick={showDrawer}
                    >
                        Cadastrar turma
                    </Button>
                    <TurmasForm isOpen={open} onClose={onClose} />
                </Flex>
                <TurmasList />
            </Content>
        </>
    )
}

export default Alunos;