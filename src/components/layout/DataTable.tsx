import { Table } from "@chakra-ui/react";

export const DataTable = ({ data, columns }: {
    data: any[],
    columns: { label: string, key: string }[]
}) => (
    <Table.Root>
        <Table.Header>
            <Table.Row>
                {columns.map(col => <Table.ColumnHeader key={col.key}>{col.label}</Table.ColumnHeader>)}
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {data.map((row, i) => (
                <Table.Row key={i}>
                    {columns.map(col => (
                        <Table.Cell key={col.key}>
                            {row[col.key] || "-"}
                        </Table.Cell>
                    ))}
                </Table.Row>
            ))}
        </Table.Body>
    </Table.Root>
);