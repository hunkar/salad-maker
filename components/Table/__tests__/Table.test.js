import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TableComponent from "../Table";

describe("Table tests", () => {
  test("Render without data", async () => {
    const tableTitle = "Mock Table";

    render(<TableComponent title={tableTitle} />);

    expect(screen.getByText(tableTitle)).toBeInTheDocument();
    expect(screen.getByText("There is no item!")).toBeInTheDocument();
  });

  test("Render with data", async () => {
    const tableTitle = "Mock Table";
    const data = [
      {
        field1: "field1 data",
        field2: "field2 data",
      },
    ];

    const fields = [
      {
        key: "field1",
        title: "field1 title",
      },
      {
        key: "field2",
        title: "field2 title",
      },
    ];

    render(
      <TableComponent title={tableTitle} tableFields={fields} list={data} />
    );

    expect(screen.getByText(tableTitle)).toBeInTheDocument();
    expect(screen.getByText(data[0].field1)).toBeInTheDocument();
    expect(screen.getByText(data[0].field2)).toBeInTheDocument();
    expect(screen.getByText(fields[0].title)).toBeInTheDocument();
    expect(screen.getByText(fields[1].title)).toBeInTheDocument();
  });

  test("Render with text format", async () => {
    const tableTitle = "Mock Table";
    const data = [
      {
        field1: "field1 data",
        field2: "field2 data",
      },
    ];

    const textFormat = jest.fn((title) => title + title);
    const fields = [
      {
        textFormat,
        key: "field1",
        title: "field1 title",
      },
      {
        key: "field2",
        title: "field2 title",
      },
    ];

    render(
      <TableComponent title={tableTitle} tableFields={fields} list={data} />
    );

    expect(screen.getByText(tableTitle)).toBeInTheDocument();
    expect(
      screen.getByText(data[0].field1 + data[0].field1)
    ).toBeInTheDocument();
    expect(textFormat).toBeCalledWith(data[0].field1, "field1", data[0]);
  });

  test("Render with custom component", async () => {
    const tableTitle = "Mock Table";
    const data = [
      {
        field1: "field1 data",
        field2: "field2 data",
      },
    ];

    const componentCreator = jest.fn((item) => (
      <div data-testid="test-custom-component">{item.field1}</div>
    ));
    const fields = [
      {
        componentCreator,
        key: "field1",
        title: "field1 title",
      },
      {
        key: "field2",
        title: "field2 title",
      },
    ];

    render(
      <TableComponent title={tableTitle} tableFields={fields} list={data} />
    );

    expect(screen.getByText(tableTitle)).toBeInTheDocument();
    expect(screen.getByText(data[0].field1)).toBeInTheDocument();
    expect(screen.getByTestId("test-custom-component")).toBeInTheDocument();
    expect(componentCreator).toBeCalledWith(data[0]);
  });

  test("Render with add button", async () => {
    const tableTitle = "Mock Table";
    const data = [
      {
        field1: "field1 data",
        field2: "field2 data",
      },
    ];

    const fields = [
      {
        key: "field1",
        title: "field1 title",
      },
      {
        key: "field2",
        title: "field2 title",
      },
    ];

    const onAddClick = jest.fn();

    render(
      <TableComponent
        title={tableTitle}
        tableFields={fields}
        list={data}
        onAddClick={onAddClick}
      />
    );

    fireEvent.click(screen.getByRole("table-add-click"));

    expect(onAddClick).toBeCalledTimes(1);
  });
});
