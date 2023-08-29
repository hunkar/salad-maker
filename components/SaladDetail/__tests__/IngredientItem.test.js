import { fireEvent, render, screen } from "@testing-library/react";
import IngredientItem from "../IngredientItem";

describe("Ingredients item tests", () => {
  test("Render without data", async () => {
    render(<IngredientItem />);

    expect(screen.getByTestId("ingredient-item")).toBeInTheDocument();
  });

  test("Render with ingredient", async () => {
    const mockIngredient = {
      id: "1",
      name: "mock ingredient",
      numOfServings: 2,
      costPerServing: 10,
      weightPerServing: 100,
    };

    render(<IngredientItem ingredient={mockIngredient} />);

    expect(
      screen.getByText(`${mockIngredient.weightPerServing}g`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockIngredient.costPerServing}€`)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockIngredient.numOfServings)
    ).toBeInTheDocument();
  });

  it("should decrease numOfServings value", async () => {
    const mockIngredient = {
      id: "1",
      name: "mock ingredient",
      numOfServings: 2,
      costPerServing: 10,
      weightPerServing: 100,
    };

    const onChange = jest.fn();

    render(<IngredientItem ingredient={mockIngredient} onChange={onChange} />);

    fireEvent.click(screen.getByRole("action-decrease-button"));

    expect(onChange).toBeCalledWith({
      ...mockIngredient,
      numOfServings: mockIngredient.numOfServings - 1,
    });
  });

  it("Should increase numOfServings value", async () => {
    const mockIngredient = {
      id: "1",
      name: "mock ingredient",
      numOfServings: 2,
      costPerServing: 10,
      weightPerServing: 100,
    };

    const onChange = jest.fn();

    render(<IngredientItem ingredient={mockIngredient} onChange={onChange} />);

    fireEvent.click(screen.getByRole("action-increase-button"));

    expect(onChange).toBeCalledWith({
      ...mockIngredient,
      numOfServings: mockIngredient.numOfServings + 1,
    });
  });

  it("Should change numOfServings value", async () => {
    const mockIngredient = {
      id: "1",
      name: "mock ingredient",
      numOfServings: 2,
      costPerServing: 10,
      weightPerServing: 100,
    };

    const onChange = jest.fn();

    render(<IngredientItem ingredient={mockIngredient} onChange={onChange} />);

    fireEvent.change(screen.getByRole("input-num-of-servings"), {
      target: { value: "13" },
    });

    expect(onChange).toBeCalledWith({
      ...mockIngredient,
      numOfServings: 13,
    });
  });

  it("Should trigger delete onDelete", async () => {
    const mockIngredient = {
      id: "1",
      name: "mock ingredient",
      numOfServings: 2,
      costPerServing: 10,
      weightPerServing: 100,
    };

    const onDelete = jest.fn();

    render(<IngredientItem ingredient={mockIngredient} onDelete={onDelete} />);

    fireEvent.click(screen.getByRole("action-delete-button"));

    expect(onDelete).toBeCalledWith(mockIngredient);
  });

  it("Should trigger onChange with old data id", async () => {
    const ingredients = [
      {
        id: "2",
        name: "mock ingredient - 2",
        numOfServings: 0,
        costPerServing: 5,
        weightPerServing: 50,
      },
      {
        id: "3",
        name: "mock ingredient - 3",
        numOfServings: 0,
        costPerServing: 15,
        weightPerServing: 150,
      },
    ];

    const mockIngredient = {
      id: "1",
      name: "mock ingredient",
      numOfServings: 2,
      costPerServing: 10,
      weightPerServing: 100,
    };

    const onChange = jest.fn();

    render(
      <IngredientItem
        ingredients={ingredients}
        ingredient={mockIngredient}
        onChange={onChange}
      />
    );

    fireEvent.change(screen.getByRole("select-ingredients"), {
      target: { value: "3" },
    });

    expect(onChange).toBeCalledWith(
      {
        ...ingredients[1],
        numOfServings: mockIngredient.numOfServings,
      },
      mockIngredient.id
    );
  });
});
