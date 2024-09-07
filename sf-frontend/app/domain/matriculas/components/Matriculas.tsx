"use client"

import { Button, Flex, Layout, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import MatriculasList from "./MatriculasList";
import MatriculaForm from "./MatriculaForm";
import React, { useState } from "react";

const { Content } = Layout;
const { Title } = Typography;

function Matriculas() {

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
                    <Title level={3}>Matrículas</Title>
                    <Button
                        type="primary"
                        className="p-3"
                        icon={<PlusCircleOutlined />}
                        onClick={showDrawer}
                    >
                        Cadastrar matrícula
                    </Button>
                    <MatriculaForm isOpen={open} onClose={onClose} />
                </Flex>
                <MatriculasList />
            </Content>
        </>
    )
}

export default Matriculas;