import React from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { TextInput, Select, Chip, Button } from "@mantine/core";
import { MdClear } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

export function SweetFilters({
  data,
  onFilteredChange,
  defaultValues = { search: "", category: "", stock: ["all"] },
}) {
  const { control, watch, reset, handleSubmit } = useForm({
    defaultValues,
  });

  const watchFilters = useWatch({ control });
  const categories = [
    "Mithai",
    "Bengali",
    "Dry Fruit",
    "Halwa",
    "Milk Based",
    "Fried",
    "Chhena",
    "Fusion",
    "Other",
  ];

  const filtered = React.useMemo(() => {
    return data.filter((sweet) => {
      const matchesName = sweet.name
        .toLowerCase()
        .includes((watchFilters.search || "").toLowerCase());
      const matchesCategory =
        !watchFilters.category || sweet.category === watchFilters.category;

      let matchesStock = true;
      if (!watchFilters.stock?.includes("all")) {
        matchesStock = watchFilters.stock.includes(
          sweet.quantity >= 50 ? "high" : sweet.quantity > 0 ? "low" : "out"
        );
      }

      return matchesName && matchesCategory && matchesStock;
    });
  }, [data, watchFilters]);

  React.useEffect(() => {
    onFilteredChange(filtered);
  }, [filtered, onFilteredChange]);

  return (
    <form
      onSubmit={handleSubmit(() => {})}
      className="flex flex-col gap-4 mb-6 items-center"
    >
      <div className="flex w-full sm:w-1/2 flex-wrap justify-center gap-2 sm:gap-4 flex-grow">
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder="Search by name..."
              {...field}
              className="w-full sm:w-2/3"
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Category"
              data={categories}
              clearable
              {...field}
               value={field.value || null}  
              className="w-full sm:w-1/4"
            />
          )}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 items-center">
        <Controller
          name="stock"
          control={control}
          render={({ field }) => {
            const toggleStock = (value) => {
              if (value === "all") {
                field.onChange(["all"]);
              } else {
                let newValue = [...field.value.filter((v) => v !== "all")];
                if (newValue.includes(value)) {
                  newValue = newValue.filter((v) => v !== value);
                } else {
                  newValue.push(value);
                }
                if (newValue.length === 0) newValue = ["all"];
                field.onChange(newValue);
              }
            };

            return (
              <div className="flex gap-2">
                {["all", "low", "high", "out"].map((val) => (
                  <Chip
                    key={val}
                    checked={field.value.includes(val)}
                    onChange={() => toggleStock(val)}
                    color={
                      val === "all"
                        ? "orange"
                        : val === "low"
                        ? "yellow"
                        : val === "high"
                        ? "green"
                        : "red"
                    }
                    variant={field.value.includes(val) ? "filled" : "outline"}
                  >
                    {val === "all"
                      ? "All"
                      : val === "low"
                      ? "< 50 Kg"
                      : val === "high"
                      ? "≥ 50 Kg"
                      : "Out of Stock"}
                  </Chip>
                ))}
              </div>
            );
          }}
        />

        <Button
          type="submit"
          className="sm:w-auto mt-2 sm:mt-0"
          leftSection={<IoSearchSharp className="text-lg" />}
        >
          Search
        </Button>

        <Button
          variant="light"
          color="red"
          className="sm:w-auto mt-2 sm:mt-0"
          onClick={() => reset()}
          leftSection={<MdClear />}
        >
          Clear
        </Button>
      </div>
    </form>
  );
}
