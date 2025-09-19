import { useState } from "react";
import {
  Modal,
  Button,
  NumberInput,
  Group,
  Slider,
  Text,
  Notification,
  Divider,
} from "@mantine/core";

export default function PurchaseModal({
  opened,
  onClose,
  maxQty,
  onPurchase,
  pricePerKg,
}) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const max = maxQty || 1;
  const min = 1;
  const tokens = Math.ceil((quantity * pricePerKg) / 100);
  const totalRs = quantity * pricePerKg;


  const handlePurchase = () => {
    if (quantity < min || quantity > max) {
      setError(`Quantity must be between ${min} and ${max}`);
      return;
    }
    setError(null);
    onPurchase(quantity, tokens, totalRs);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Purchase Sweet" centered>
      <Text mb="sm">Select quantity to purchase (max {max} kg):</Text>
      <Slider
        min={min}
        max={max}
        value={quantity}
        onChange={setQuantity}
        step={1}
        marks={[
          { value: min, label: `${min}` },
          { value: max, label: `${max}` },
        ]}
        mb="md"
      />
      <Divider mt="lg" label="Or enter manually" />
      <NumberInput
        label="Quantity (kg)"
        value={quantity}
        onChange={setQuantity}
        min={min}
        max={max}
        required
        mb="md"
      />
      <Text mb="xs">1 token = ₹100</Text>
      <Text mb="xs">
        Total: <b>{quantity}</b> kg × ₹{pricePerKg} = <b>₹{totalRs}</b>
      </Text>
      <Text mb="md">
        Tokens required: <b>{tokens}</b>
      </Text>
      {error && (
        <Notification color="red" mb="md">
          {error}
        </Notification>
      )}
      <Group>
        <Button onClick={handlePurchase} color="orange">
          Buy
        </Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </Group>
    </Modal>
  );
}
