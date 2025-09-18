import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Table,
  Group,
  Modal,
  TextInput,
  NumberInput,
  Loader,
  Notification,
} from "@mantine/core";
import { useState } from "react";
import { fetchSweets, createSweet, updateSweet, deleteSweet } from "../api/sweets";
import { toast } from "react-toastify";
export function SweetsList() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sweets"],
    queryFn: fetchSweets,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSweet,
    onSuccess: () => {
      toast.success("Sweet deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["sweets"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete sweet");
    }
  });

  const [editSweet, setEditSweet] = useState(null);
  const [addModal, setAddModal] = useState(false);

  if (isLoading) return <Loader />;
  if (error) return <Notification color="red">{error.message}</Notification>;

  return (
    <>
      <Button onClick={() => setAddModal(true)}>Add Sweet</Button>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.sweets?.map((sweet) => (
            <tr key={sweet._id}>
              <td>{sweet.name}</td>
              <td>{sweet.category}</td>
              <td>{sweet.price}</td>
              <td>{sweet.quantity}</td>
              <td>
                <Group>
                  <Button size="xs" onClick={() => setEditSweet(sweet)}>
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    onClick={() => deleteMutation.mutate(sweet._id)}
                  >
                    Delete
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Modal */}
      <SweetModal
        opened={addModal}
        onClose={() => setAddModal(false)}
        onSuccess={() =>
          queryClient.invalidateQueries({ queryKey: ["sweets"] })
        }
      />

      {/* Edit Modal */}
      {editSweet && (
        <SweetModal
          sweet={editSweet}
          opened={!!editSweet}
          onClose={() => setEditSweet(null)}
          onSuccess={() =>
            queryClient.invalidateQueries({ queryKey: ["sweets"] })
          }
        />
      )}
    </>
  );
}

function SweetModal({ sweet, opened, onClose, onSuccess }) {
  const isEdit = !!sweet;
  const [name, setName] = useState(sweet?.name || "");
  const [category, setCategory] = useState(sweet?.category || "");
  const [price, setPrice] = useState(sweet?.price || 0);
  const [quantity, setQuantity] = useState(sweet?.quantity || 0);

  // v5 useMutation
  const mutation = useMutation({
    mutationFn: isEdit
      ? (data) => updateSweet(sweet._id, data)
      : createSweet,
    onSuccess: () => {
      onSuccess();
      toast.success(`Sweet ${isEdit ? "updated" : "created"} successfully`);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || `Failed to ${isEdit ? "update" : "create"} sweet`);
    }
  });

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? "Edit Sweet" : "Add Sweet"}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate({ name, category, price, quantity });
        }}
      >
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextInput
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <NumberInput
          label="Price"
          value={price}
          onChange={setPrice}
          required
          min={0}
        />
        <NumberInput
          label="Quantity"
          value={quantity}
          onChange={setQuantity}
          required
          min={0}
        />
        <Group mt="md">
          <Button type="submit" loading={mutation.isLoading}>
            {isEdit ? "Update" : "Add"}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </Group>
        {mutation.isError && (
          <Notification color="red">
            {mutation.error?.message || "Something went wrong"}
          </Notification>
        )}
      </form>
    </Modal>
  );
}
