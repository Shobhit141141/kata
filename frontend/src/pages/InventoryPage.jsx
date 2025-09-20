import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Table,
  Group,
  NumberInput,
  Modal,
  Loader,
  Card,
  Title,
  Container,
  Stack,
  Text,
  Badge,
  Paper,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { restockSweet } from "../api/inventory";
import { fetchSweets } from "../api/sweets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { SweetFilters } from "../components/SweetFilters";
import SEO from "./SEO";
import Lenis from "@studio-freight/lenis";
export function InventoryPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sweets"],
    queryFn: fetchSweets,
  });

  const [restockModal, setRestockModal] = useState(null);

  const [filteredSweets, setFilteredSweets] = useState([]);

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
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); 
    };
  }, []);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="lg" mt="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Container>
        <Card shadow="md" radius="lg" p="xl" withBorder>
          <Title order={3} color="red">
            ❌ Error Loading Inventory
          </Title>
          <Text mt="sm" color="dimmed">
            {error.message}
          </Text>
        </Card>
      </Container>
    );
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto p-4 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <SEO title="Inventory" description="Manage your sweet inventory" image="/logo.png" />
      <Paper shadow="sm" radius="lg" p="lg" withBorder>
        <h2 className="text-4xl font-bold mt-4 mb-8 text-center">Inventory</h2>

        <SweetFilters
          data={data.sweets}
          onFilteredChange={(filtered) => setFilteredSweets(filtered)}
        />

        <Stack>
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>S. No.</Table.Th>
                <Table.Th>Image</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Price (/kg)</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {filteredSweets.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={6} className="text-center text-gray-500 h-24">
                    No sweets found.
                  </Table.Td>
                </Table.Tr>
              ) : (
                filteredSweets?.map((sweet, index) => (
                  <Table.Tr key={sweet._id}>
                    <Table.Td>
                      <Text fw={600}>{index + 1}</Text>
                    </Table.Td>
                    <Table.Td>
                      <img
                        src={sweet.imageUrl}
                        alt={sweet.name}
                        className="w-32 h-32 object-cover"
                      />
                    </Table.Td>
                    <Table.Td>
                      <Text fw={600}>{sweet.name}</Text>
                    </Table.Td>
                    <Table.Td>
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 mr-2 rounded-full ${
                            sweet.quantity === 0
                              ? "bg-red-500"
                              : sweet.quantity < 50
                              ? "bg-amber-500"
                              : "bg-green-500"
                          }`}
                        ></div>
                        <Text fw={600}>{sweet.quantity} Kg</Text>
                      </div>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={600}>₹{sweet.price}</Text>
                    </Table.Td>
                    <Table.Td>
                      <div className="flex justify-start gap-2">
                        <Button
                          size="xs"
                          color="orange"
                          onClick={() => {
                            window.open(`/edit-sweet/${sweet._id}`, "_blank");
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="xs"
                          color="violet"
                          onClick={() => setRestockModal(sweet)}
                        >
                          Restock
                        </Button>
                      </div>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </Stack>
      </Paper>

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
    </motion.div>
  );
}

function RestockModal({ sweet, onClose, onRestock, loading }) {
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState(null);

  const handleAmountChange = (val) => {
    if (val < 1) {
      setError("Amount must be at least 1 Kg");
    } else {
      setError(null);
    }
  };

  return (
    <Modal
      opened={!!sweet}
      onClose={onClose}
      centered
      radius="lg"
      title={<Title order={4}>📦 Restock {sweet.name}</Title>}
    >
      <div style={{ marginBottom: 8 }}>
        <Text fw={700} component="span">
          Current stock:
        </Text>{" "}
        <Text component="span">{sweet.quantity} Kg</Text>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Text fw={700} component="span">
          Updated stock:
        </Text>{" "}
        <Text component="span">{sweet.quantity + amount} Kg</Text>
      </div>
      <NumberInput
        label={"Amount to add (Kg)"}
        value={amount}
        onChange={(val) => {
          const newVal = val ?? 1;
          setAmount(newVal);

          if (newVal < 1) {
            setError("Amount must be at least 1 Kg");
          } else {
            setError(null);
          }
        }}
        error={error}
        required
        mt="sm"
        defaultValue={1}
        step={10}
      />
      <Group mt="md" justify="flex-end">
        <Button
          color="violet"
          onClick={() => {
            if (!error) onRestock(amount);
          }}
          loading={loading}
          disabled={!!error || loading}
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
