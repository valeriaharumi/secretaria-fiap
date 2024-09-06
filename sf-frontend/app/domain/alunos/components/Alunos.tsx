"use client"

import { Button, Flex, Layout, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import AlunosList from "./AlunosList";

const { Content } = Layout;
const { Title } = Typography;

function Alunos() {

    const handleCreateStudent = () => {
        //TO DO
    };

    return (
        <>
            <Content className="p-4">
            <Flex justify="space-between">
                <Title level={3}>Alunos</Title>
                <Button
                    type="primary"
                    className="p-3"
                    icon={<PlusCircleOutlined />}
                    onClick={() => {
                        handleCreateStudent
                    }}
                >
                    Cadastrar aluno
                </Button>
            </Flex>
            <AlunosList/>
        </Content>
        </>
    )
}

export default Alunos;