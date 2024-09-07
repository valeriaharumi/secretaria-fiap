"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Layout, Flex, Image } from "antd";
import { UserOutlined, UsergroupAddOutlined, IdcardOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const MainMenu = (): JSX.Element => {
    const router = useRouter();
    const pathname = usePathname();

    const [selectedKey, setSelectedKey] = useState("1");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const items = [
        {
            key: "1",
            icon: <UserOutlined className="text-white w-6 h-6" />,
            label: "Alunos",
            route: "/alunos",
        },
        {
            key: "2",
            icon: <UsergroupAddOutlined className="text-white w-6 h-6" />,
            label: "Turmas",
            route: "/turmas",
        },
        {
            key: "3",
            icon: <IdcardOutlined className="text-white w-6 h-6" />,
            label: "Matrículas",
            route: "/matriculas",
        }
    ];

    const handleMenuClick = (e: any) => {
        const selectedItem = items.find((item) => item.key === e.key);
        if (selectedItem) {
            router.push(selectedItem.route);
        }
    };

    useEffect(() => {
        const currentItem = items.find((item) => item.route === pathname);
        if (currentItem) {
            setSelectedKey(currentItem.key);
        }
    }, [items, pathname]);

    return (
        <Sider className="h-screen">
            <div className="h-full flex-1 flex flex-col">
                <Flex
                    className="items-center px-3 py-5"
                >
                    <Image
                        src="/assets/light_full_logo.svg"
                        preview={false}
                        alt=""
                        className="h-12 w-40"
                    />
                </Flex>
                <div className="flex-grow">
                    <Menu
                        selectedKeys={[selectedKey]}
                        onClick={handleMenuClick}
                        items={items}
                        theme="dark"
                        className="px-3"
                    />
                </div>


            </div>
        </Sider>
    );
};

export default MainMenu;
