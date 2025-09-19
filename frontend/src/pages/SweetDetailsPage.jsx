import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSweetById, deleteSweet } from "../api/sweets";
import { Loader, Button, Group, Badge, Notification } from "@mantine/core";
import PurchaseModal from "../components/PurchaseModal";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { purchaseSweet } from "../api/inventory";
import { useEffect, useState } from "react";

function getRandomStockHeadline(quantity) {
  const headlines = {
    plenty: [
      "Our shelves are stacked higher than laddoos at a wedding buffet tonight. Don't miss out!",
      "Sweetness is flooding in like jalebis in hot oil, plenty for everyone. Indulge now!",
      "This batch is fresher than morning chai and stocked enough for the whole mohalla. Grab yours now!",
      "Overflow alert: we’ve got so much stock, even your dadi would approve. Don't wait!",
      "Buckets of mithai happiness waiting here, enough to host a full shaadi. Grab the deal now or be square!",
    ],
    low: [
      "This tray is emptier than your wallet after Diwali shopping sprees. Hurry! It is gonna be gone soon.",
      "Only a sprinkle left, sweeter than jalebis and disappearing faster than free WiFi. Act fast or miss out!",
      "Hurry, this sweet’s scarcer than seats in Rajdhani train during holiday season. Don't wait else it will be too late!",
      "Last few kilos remain, vanishing quicker than mom’s hidden ladoo stash. Grab yours before it's gone!",
      "Stock thinner than dal at a hostel canteen,We will run out soon and we don't want you to have FOMO.",
    ],
    out: [
      "Empty tray spotted, this sweet vanished faster than free samples at a wedding. Don't worry, new stock is on the way!",
      "All gone! Sweeter than a promise, and broken just as quickly. But we are working on restocking it.",
      "This mithai is currently on waiting list, check back when it returns refreshed and book in TATKAL.",
      "Sold out faster than cricket tickets during an India–Pakistan World Cup match. But we will be back sooner than Pak players stay on field.",
      "Our chefs are recharging with chai; fresh batches will roll out soon. Till then try kaju katli or rasgulla.",
    ],
  };

  let category = "out";
  if (quantity >= 20) category = "plenty";
  else if (quantity > 0) category = "low";

  const options = headlines[category];
  return options[Math.floor(Math.random() * options.length)];
}

export default function SweetDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [stockHeadline, setStockHeadline] = useState("");

  const { data, isPending, error } = useQuery({
    queryKey: ["sweet", id],
    queryFn: () => fetchSweetById(id),
  });

  const {
    user: authUser,
    isLoading: isAuthLoading,
    isAuthenticated,
    isAdmin,
    setTokens,
  } = useAuthContext();

  const deleteMutation = useMutation({
    mutationFn: deleteSweet,
    onSuccess: () => {
      toast.success("Sweet deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["sweets"] });
      navigate("/sweets");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete sweet");
    },
  });

  const { user, refetch } = useAuthContext();
  const [localSweet, setLocalSweet] = useState(null);
  const purchaseMutation = useMutation({
    mutationFn: ({ id, quantity }) => purchaseSweet(id, quantity),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["sweets"] });
      toast.success(
        `Purchased ${result.purchased.quantity}kg for ${result.purchased.tokens} tokens!`
      );
      setTokens((prev) => prev - result.purchased.tokens);
      setLocalSweet(result.sweet);
      if (refetch) refetch();
    },
    onError: (err) => {
      toast.error(err.message || "Unable to purchase sweet.");
    },
  });
  const [purchaseOpen, setPurchaseOpen] = useState(false);

  const sweet = localSweet || data?.sweet;

  useEffect(() => {
  if (sweet) {
    setStockHeadline(getRandomStockHeadline(sweet.quantity));
  }
}, [sweet?.quantity]);


  if (isPending) return <Loader />;
  if (error instanceof Error)
    return <Notification color="red">{error.message}</Notification>;

  if (!sweet) return <Notification color="red">Sweet not found</Notification>;

  let stockColor = "bg-red-400 border-red-400 text-white";
  let stockText = <>Out of Stock</>;
  let stockStatus = "Out of Stock";
  if (sweet.quantity > 0 && sweet.quantity < 20) {
    stockColor = "bg-amber-500 border-amber-500 text-white";
    stockText = <>{sweet.quantity} Kg left</>;
    stockStatus = "Limited Stock";
  } else if (sweet.quantity >= 20) {
    stockColor = "bg-green-500 border-green-500 text-white";
    stockText = <>{sweet.quantity} Kg left</>;
    stockStatus = "In Stock";
  }

  return (
    <div className="pt-18 pb-10 min-h-screen relative flex justify-center items-start">
      <div className="max-w-2xl mx-auto px-6 rounded-xl shadow-lg p-8 bg-white">
        <div className="flex items-stretch justify-between">
          {/* Left Section */}
          <img
            src={sweet.imageUrl}
            alt={sweet.name}
            className="w-1/2 aspect-[4/3] object-cover rounded-lg shadow-md bg-orange-500"
          />

          {/* Right Section */}
          <div className="flex flex-col flex-1 ml-6 justify-between">
            {/* Name and Category */}
            <div className="flex flex-col flex-1 ">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-4xl font-bold">{sweet.name}</h2>
                <Badge color="pink" variant="filled">
                  {sweet.category}
                </Badge>
              </div>
              <h4 className="text-gray-500 text-lg">{sweet.description}</h4>
            </div>

            {/* Price and Stock */}
            <div className="flex items-end justify-between mt-4">
              <p className="text-gray-700 text-4xl">
                ₹{sweet.price} <span className="text-xl font-normal">/kg</span>
              </p>
              <div
                className={`inline-flex items-center border-2 rounded-sm px-2 text-sm font-bold ${stockColor} mb-2`}
              >
                {stockText}
              </div>
            </div>
          </div>
        </div>

        {!isAuthLoading && isAuthenticated && isAdmin ? (
          <div className="flex gap-4 mt-6">
            <Button
              color="orange"
              onClick={() => navigate(`/edit-sweet/${sweet._id}`)}
            >
              Edit
            </Button>
            <Button
              color="red"
              onClick={() => deleteMutation.mutate(sweet._id)}
              loading={deleteMutation.isPending}
            >
              Delete
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-start mt-6">
            <p>{stockHeadline}</p>
            <Button
              className="mt-2"
              color="blue"
              onClick={() => setPurchaseOpen(true)}
            >
              Purchase
            </Button>
            <PurchaseModal
              opened={purchaseOpen}
              onClose={() => setPurchaseOpen(false)}
              maxQty={sweet.quantity}
              pricePerKg={sweet.price}
              onPurchase={(qty) => {
                purchaseMutation.mutate({ id: sweet._id, quantity: qty });
                setPurchaseOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
