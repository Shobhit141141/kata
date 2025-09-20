import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSweetById,
  deleteSweet,
  fetchRecommendedSweets,
  getFunFact,
} from "../api/sweets";
import { Loader, Button, Group, Badge, Notification } from "@mantine/core";
import PurchaseModal from "../components/PurchaseModal";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";
import { purchaseSweet } from "../api/inventory";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["sweet", id],
    queryFn: () => fetchSweetById(id),
  });

  const { data: recommendedSweets, isLoading: isLoadingRecommended } = useQuery({
    queryKey: ["recommendedSweets", id],
    queryFn: () => fetchRecommendedSweets(id),
  });

  const { data: funFact, isLoading: isLoadingFunFact } = useQuery({
    queryKey: ["funFact", data?.sweet?.name],
    queryFn: () => getFunFact(data?.sweet?.name),
    enabled: !!data?.sweet?.name,
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
    if (sweet && authUser) {
      setStockHeadline(getRandomStockHeadline(sweet.quantity));
    }
  }, [sweet?.quantity]);



  function getStockStatus(quantity) {
    let stockColor = "bg-red-400 border-red-400 text-white";
    let stockText = <>Out of Stock</>;
    let stockStatus = "Out of Stock";
    if (quantity > 0 && quantity < 20) {
      stockColor = "bg-amber-500 border-amber-500 text-white";
      stockText = <>{quantity} Kg left</>;
      stockStatus = "Limited Stock";
    } else if (quantity >= 20) {
      stockColor = "bg-green-500 border-green-500 text-white";
      stockText = <>{quantity} Kg left</>;
      stockStatus = "In Stock";
    }

    return { stockColor, stockText, stockStatus };
  }

  if (isLoading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader />
    </div>
  );
}

  return (
    <motion.div
      className="pt-20 pb-10 min-h-screen relative flex max-sm:flex-col justify-center items-start px-10 gap-4 w-full mx-auto"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // exit={{ opacity: 0 }}
    >
      <div className="w-full md:w-[60%] px-6 rounded-xl shadow-lg p-8 bg-white">
        <div className="flex max-sm:flex-col items-stretch justify-between">
          {/* Left Section */}
          <img
            src={sweet.imageUrl}
            alt={sweet.name}
            className="w-full md:w-1/2 aspect-[4/3] object-cover rounded-lg shadow-md bg-orange-500 max-sm:mb-6"
          />

          {/* Right Section */}
          <div className="flex flex-col flex-1 md:ml-6 justify-between">
            {/* Name and Category */}
            <div className="flex flex-col flex-1 ">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-4xl font-bold">{sweet.name}</h2>
                <Badge color="pink" variant="filled">
                  {sweet.category}
                </Badge>
              </div>
              <h4 className=" text-md">{sweet.description}</h4>
            </div>

            {/* Price and Stock */}
            <div className="flex items-end justify-between mt-4">
              <p className="text-gray-700 text-4xl">
                ₹{sweet.price} <span className="text-xl font-normal">/kg</span>
              </p>
              <div
                className={`inline-flex items-center border-2 rounded-sm px-2 text-sm font-bold ${
                  getStockStatus(sweet.quantity).stockColor
                } mb-2`}
              >
                {getStockStatus(sweet.quantity).stockText}
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

        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-4">
            Fun fact about {sweet.name}

            <p className="text-sm ">using <span className="bg-gradient-to-r from-blue-500  to-pink-500 bg-clip-text text-transparent">Gemini</span></p>
          </h3>
          <p className="text-gray-700 text-md">
            {isLoadingFunFact ? "Gemini thinking..." : funFact?.funFact || "No fun fact available."}
          </p>
        </div>
      </div>

      <div className=" w-full md:w-[40%] rounded-xl shadow-lg p-8 bg-white">
        <h3 className="text-2xl font-bold mb-4">Try These Sweets too.</h3>
        {recommendedSweets?.sweets?.length === 0 && (
          <p>No recommended sweets found.</p>
        )}
        <div className="flex flex-col gap-2 items-center">
          {recommendedSweets?.sweets?.map((sweet) => (
            <div
              key={sweet._id}
              className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition text-black cursor-pointer flex items-center gap-2 h-[120px] w-full"
              onClick={() => navigate(`/sweets/${sweet._id}`)}
            >
              <img
                src={sweet.imageUrl}
                alt={sweet.name}
                className="h-full object-cover w-[40%] bg-orange-500"
              />

              <div className="flex items-center justify-between w-full">
                <div className="p-2 flex flex-col items-start gap-4 justify-start">
                  <h2 className="text-lg font-semibold">{sweet.name}</h2>
                  <Badge color="pink" variant="light">
                    {sweet.category}
                  </Badge>
                </div>

                <div className="p-2 flex flex-col items-end gap-4 justify-start">
                  <h2 className="text-lg font-semibold">
                    ₹{sweet.price}{" "}
                    <span className="text-sm font-normal">/kg</span>
                  </h2>
                  <div
                    className={`inline-flex items-center border-2 rounded-sm px-2 text-xs font-bold ${
                      getStockStatus(sweet.quantity).stockColor
                    } mb-2`}
                  >
                    {getStockStatus(sweet.quantity).stockText}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
