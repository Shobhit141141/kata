import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Group, Loader, Badge, Title } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { fetchSweets, deleteSweet } from "../api/sweets";
import { toast } from "react-toastify";
import { GoDotFill } from "react-icons/go";

export function SweetsList() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
    },
  });

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Failed to load sweets</p>;

  return (
    <div className="pt-18 px-10">
      <h2 className="text-4xl font-bold mt-4 mb-8">Sweets</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.sweets?.map((sweet) => {
          let stockColor = "bg-red-400 border-red-400 text-white";
          let stockText = <>Out of Stock</>;

          if (sweet.quantity > 0 && sweet.quantity < 20) {
            stockColor = "bg-amber-500 border-amber-500 text-white";
            stockText = <>{sweet.quantity} Kg left</>;
          } else if (sweet.quantity >= 20) {
            stockColor = "bg-green-500 border-green-500 text-white";
            stockText = <>{sweet.quantity} Kg left</>;
          }

          return (
            <Link
              to={`/sweets/${sweet._id}`}
              key={sweet._id}
              className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition text-black"
            >
              <img
                src={sweet.imageUrl}
                alt={sweet.name}
                className="aspect-[4/3] object-cover w-full bg-orange-500"
              />

              <div className="p-2 bg-white">
                <Group justify="space-between" mb="xs">
                  <h2 className="text-lg font-semibold">{sweet.name}</h2>
                  <Badge color="pink" variant="light">
                    {sweet.category}
                  </Badge>
                </Group>

                <p className="text-xs text-gray-700 mb-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Tenetur, praesentium.
                </p>

                <div className="flex flex-row-reverse justify-between items-center">
                  <p className="text-xl font-medium mr-2">
                    ₹{sweet.price}
                    <span className="text-sm font-normal">/kg</span>
                  </p>
                  <div
                    className={`flex items-center justify-center border-2 rounded-sm px-2 text-sm font-bold ${stockColor}`}
                  >
                    {stockText}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
