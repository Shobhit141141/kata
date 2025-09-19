import {
  TextInput,
  NumberInput,
  Button,
  Group,
  FileInput,
  Textarea,
  Select,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { createSweet, updateSweet } from "../api/sweets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaFileImage } from "react-icons/fa6";
import { useForm, Controller } from "react-hook-form";

export default function SweetForm({ sweet, onSuccess }) {
  const isEdit = !!sweet;
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: sweet?.name || "",
      description: sweet?.description || "",
      category: sweet?.category || "",
      price: sweet?.price || null,
      quantity: sweet?.quantity || null,
      image: null,
    },
  });

  const image = watch("image");

  const mutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("quantity", data.quantity);
      if (data.image) formData.append("file", data.image);

      return isEdit ? updateSweet(sweet._id, formData) : createSweet(formData);
    },
    onSuccess: () => {
      toast.success(`Sweet ${isEdit ? "updated" : "created"} successfully`);
      if (onSuccess) onSuccess();
      navigate("/sweets");
    },
    onError: (error) => {
      toast.error(
        error.message || `Failed to ${isEdit ? "update" : "create"} sweet`
      );
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      noValidate
      className="flex flex-col gap-2 pb-10 josefin"
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <TextInput
            label="Name"
            placeholder="e.g., Chocolate Cake"
            required
            {...field}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: "Description is required" }}
        render={({ field }) => (
          <Textarea
            label="Description"
            placeholder="e.g., A delicious chocolate cake"
            required
            {...field}
            error={errors.description?.message}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        rules={{ required: "Category is required" }}
        render={({ field }) => (
          <Select
            label="Category"
            placeholder="Select category"
            required
            data={[
              { value: "Mithai", label: "Mithai" },
              { value: "Bengali", label: "Bengali" },
              { value: "Dry Fruit", label: "Dry Fruit" },
              { value: "Halwa", label: "Halwa" },
              { value: "Milk Based", label: "Milk Based" },
              { value: "Fried", label: "Fried" },
              { value: "Chhena", label: "Chhena" },
              { value: "Fusion", label: "Fusion" },
              { value: "Other", label: "Other" },
            ]}
            {...field}
            error={errors.category?.message}
          />
        )}
      />

      <Controller
        name="price"
        control={control}
        rules={{
          required: "Price is required",
          min: { value: 1, message: "Price must be positive" },
        }}
        render={({ field }) => (
          <NumberInput
            label="Price"
            description="Price in ₹ per kilogram"
            placeholder="e.g., 10.99"
            prefix="₹/KG "
            required
            {...field}
            error={errors.price?.message}
          />
        )}
      />

      <Controller
        name="quantity"
        control={control}
        rules={{
          required: "Quantity is required",
          min: { value: 1, message: "Quantity must be positive" },
        }}
        render={({ field }) => (
          <NumberInput
            label="Quantity"
            description="Quantity in kilograms"
            placeholder="e.g., 50"
            suffix=" KG"
            required
            {...field}
            error={errors.quantity?.message}
          />
        )}
      />

      <Controller
        name="image"
        control={control}
        rules={
          !isEdit
            ? { required: "Image is required" }
            : {}
        }
        render={({ field }) => (
          <FileInput
            label="Image"
            placeholder="Choose image"
            accept="image/*"
            required={!isEdit}
            value={field.value}
            onChange={(file) => field.onChange(file)}
            error={errors.image?.message}
            rightSection={<FaFileImage />}
          />
        )}
      />

      {image && (
        <>
          <Button
            color="red"
            onClick={() => setValue("image", null)}
            size="sm"
            mb={4}
          >
            Clear Image
          </Button>

          <div className="flex flex-wrap mt-2 mb-4 relative bg-white rounded-xl shadow-md">
            <img src={URL.createObjectURL(image)} alt="Preview" />
          </div>
        </>
      )}

      <Group mt="md">
        <Button type="submit" loading={mutation.isPending}>
          {isEdit ? "Update" : "Add"}
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            reset({
              name: "",
              description: "",
              category: "",
              price: null,
              quantity: null,
              image: null,
            })
          }
        >
          Cancel
        </Button>
      </Group>

      {mutation.isError && (
        <div>
          <h2>Error</h2>
          <p>{mutation.error?.message || "Something went wrong"}</p>
        </div>
      )}
    </form>
  );
}
