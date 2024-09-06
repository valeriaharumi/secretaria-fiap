"use client";
import { Skeleton } from "antd";
import React from "react";

const TableSkeleton = () => {
    return (
        <Skeleton
            active
            loading
            paragraph={{ rows: 12, width: 0 }}
            style={{ marginTop: 12, marginLeft: 32, width: "95vw" }}
            title={false}
            round={true}
        />
    );
};

export default TableSkeleton;
