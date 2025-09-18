import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Table,
  Group,
  NumberInput,
  Modal,
  Loader,
  Notification,
  Card,
  Title,
  Container,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import { purchaseSweet, restockSweet } from "../api/inventory";
import { fetchSweets } from "../api/sweets";
import { toast } from "react-toastify";

export function InventoryPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sweets"],
    queryFn: fetchSweets,
  });

  const [restockModal, setRestockModal] = useState(null);

  const purchaseMutation = useMutation({
    mutationFn: purchaseSweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sweets"] });
      toast.success("Sweet purchased successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Unable to purchase sweet.");
    },
  });

  const restockMutation = useMutation({
    mutationFn: ({ id, amount }) => restockSweet(id, amount),
    onSuccess: () => {
      setRestockModal(null);
      queryClient.invalidateQueries({ queryKey: ["sweets"] });
      toast.success("Sweet restocked successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to restock sweet.");
    },
  });

  if (isLoading) {
    return (
      <Container>
        <Loader size="lg" />
      </Container>
    );
  }

  if (error) {
    return (
      <Notification color="red" title="Error">
        {error.message}
      </Notification>
    );
  }

  return (
    <Container size="lg" mt="xl">
      <Card shadow="md" radius="lg" p="xl" withBorder>
        <Stack>
          <Title
            order={2}
            align="center"
            mb="md"
            style={{ fontFamily: "serif" }}
          >
            🍬 Royal Sweet Inventory
          </Title>

          <Table highlightOnHover striped withColumnBorders>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.sweets.map((sweet) => (
                <tr key={sweet._id}>
                  <td style={{ fontWeight: 500 }}>{sweet.name}</td>
                  <td>{sweet.quantity}</td>
                  <td>
                    <Group position="center">
                      <Button
                        size="xs"
                        color="blue"
                        onClick={() => purchaseMutation.mutate(sweet._id)}
                        loading={purchaseMutation.isLoading}
                      >
                        Purchase
                      </Button>
                      <Button
                        size="xs"
                        color="violet"
                        onClick={() => setRestockModal(sweet)}
                      >
                        Restock
                      </Button>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Stack>
      </Card>

      {restockModal && (
        <RestockModal
          sweet={restockModal}
          onClose={() => setRestockModal(null)}
          onRestock={(amount) =>
            restockMutation.mutate({ id: restockModal._id, amount })
          }
          loading={restockMutation.isLoading}
        />
      )}
    </Container>
  );
}

function RestockModal({ sweet, onClose, onRestock, loading }) {
  const [amount, setAmount] = useState(1);

  return (
    <Modal
      opened={!!sweet}
      onClose={onClose}
      centered
      radius="lg"
      title={<Title order={4}>Restock {sweet.name}</Title>}
    >
      <NumberInput
        label="Amount"
        value={amount}
        onChange={setAmount}
        min={1}
        required
      />
      <Group mt="md" position="right">
        <Button
          color="violet"
          onClick={() => onRestock(amount)}
          loading={loading}
        >
          Restock
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </Group>
    </Modal>
  );
}
