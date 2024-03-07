
import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Input, TableColumnSizingOptions, Textarea, Toolbar, ToolbarButton, ToolbarDivider, ToolbarToggleButton, Tooltip, makeStyles, useTableColumnSizing_unstable } from "@fluentui/react-components";
import { FieldProps, ObjectFieldTemplatePropertyType, ObjectFieldTemplateProps, WidgetProps, getUiOptions } from "@rjsf/utils";
import {
    PresenceBadgeStatus,
    Avatar,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    TableSelectionCell,
    TableCellLayout,
    useTableFeatures,
    TableColumnDefinition,
    useTableSelection,
    createTableColumn,
} from "@fluentui/react-components";
import { useCallback, useState } from "react";

import { registerInputControlDesignerField } from "@eavfw/quickform-designer";
type Item = {
    key: string,
    label: string;
    value: string;
    keyboardkey: string
}
const columns: TableColumnDefinition<Item>[] = [
    createTableColumn<Item>({
        columnId: "key",
    }),
    createTableColumn<Item>({
        columnId: "label",
    }),
    createTableColumn<Item>({
        columnId: "value",
    }),
    createTableColumn<Item>({
        columnId: "keyboardkey",
    }),
];

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
    toolbar: {
        justifyContent: "end"
    }
});


export const OptionsFields: React.FC<FieldProps<{ [key: string]: {} }>> = ({ uiSchema = {}, schema: rawSchema, required, formData, registry, title, name, onChange, ...props }) => {

    const styles = useStyles();
    const { fields, formContext, schemaUtils, translateString, globalUiOptions } = registry;
    const schema = schemaUtils.retrieveSchema(rawSchema, formData);

    const json = JSON.stringify(formData);
    const uiOptions = getUiOptions(uiSchema, globalUiOptions);

    const templateTitle = uiOptions.title ?? schema.title ?? title ?? name;
    const description = uiOptions.description ?? schema.description;

    const items = Object.entries(formData ?? {}).map(([k, e]) => (typeof (e) === "string" ? { key: k, label: e } : { key: k, label: e, ...e })) as Item[];

    const [columnSizingOptions] = useState<TableColumnSizingOptions>({
        key: {
            defaultWidth: 100,
           // minWidth: 100,
        },
        label: {
           // minWidth: 200,
            defaultWidth: 200,
        },
       
    });

    const {
        getRows,
        columnSizing_unstable,
        selection: {
            allRowsSelected,
            someRowsSelected,
            toggleAllRows,
            toggleRow,
            isRowSelected,
        },
    } = useTableFeatures(
        {
            columns,
            items,
        },
        [
            useTableSelection({
                selectionMode: "multiselect",
                defaultSelectedItems: new Set(),
            }),
            useTableColumnSizing_unstable({ columnSizingOptions })
        ],
       
    );
    const toggleAllKeydown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === " ") {
                toggleAllRows(e);
                e.preventDefault();
            }
        },
        [toggleAllRows]
    );
    const rows = getRows((row) => {
        const selected = isRowSelected(row.rowId);
        return {
            ...row,
            onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
            onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === " ") {
                    e.preventDefault();
                    toggleRow(e, row.rowId);
                }
            },
            selected,
            appearance: selected ? ("brand" as const) : ("none" as const),
        };
    });

    const [open, setOpen] = useState(false);
    const [optionKey, setOptionKey] = useState('');
    const [optionLabel, setOptionLabel] = useState('');

    const handleSubmit = () => {

        onChange({ ...formData, [optionKey]: optionLabel });
        setOpen(false);
        setOptionKey('');
        setOptionLabel('');
    }

    return (<>
        <Dialog open={open}
            onOpenChange={(event, data) => {
                // it is the users responsibility to react accordingly to the open state change
                setOpen(data.open);
            }}>

            <DialogSurface aria-describedby={undefined}>

                <DialogBody>
                    <DialogTitle>New Option</DialogTitle>
                    <DialogContent className={styles.content}>
                        <Field label="Option Key">
                            <Input value={optionKey} required type="text" id={"question-schema-name"} onChange={(e, d) => setOptionKey(d.value)} />
                        </Field>
                        <Field label="Option Label">
                            <Input value={optionLabel} required type="text" id={"question-schema-name"} onChange={(e, d) => setOptionLabel(d.value)} />
                        </Field>


                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Close</Button>
                        </DialogTrigger>
                        <Button type="submit" appearance="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </DialogActions>
                </DialogBody>

            </DialogSurface>
        </Dialog>
        <Toolbar aria-label="Table Toolbar" size="small" className={styles.toolbar}>
            <ToolbarDivider />
            <Tooltip
                content="Add another option"
                relationship="description"
                withArrow
            >
                <ToolbarButton appearance="primary" onClick={() => setOpen(true)}>Add</ToolbarButton>
            </Tooltip>

        </Toolbar>
        <Table aria-label="Table with multiselect" size="small">
            <TableHeader>
                <TableRow>
                    <TableSelectionCell
                        checked={
                            allRowsSelected ? true : someRowsSelected ? "mixed" : false
                        }
                        onClick={toggleAllRows}
                        onKeyDown={toggleAllKeydown}
                        checkboxIndicator={{ "aria-label": "Select all rows " }}
                      
                    />

                    <TableHeaderCell   {...columnSizing_unstable.getTableHeaderCellProps('key')}>Key</TableHeaderCell>
                    <TableHeaderCell {...columnSizing_unstable.getTableHeaderCellProps('label')}>Label</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
                    <TableRow
                        key={item.key}
                        onClick={onClick}
                        onKeyDown={onKeyDown}
                        aria-selected={selected}
                        appearance={appearance}
                    >
                        <TableSelectionCell
                            checked={selected}
                            checkboxIndicator={{ "aria-label": "Select row" }}
                        />
                        <TableCell>
                            <TableCellLayout>
                                {item.key}
                            </TableCellLayout>
                        </TableCell>
                        <TableCell>
                            <TableCellLayout>
                                {item.label}
                            </TableCellLayout>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>);
};

registerInputControlDesignerField("OptionsFields", OptionsFields);