import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Group,
  Loader,
  Badge,
  TextInput,
  Select,
  Chip,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { fetchSweets } from "../api/sweets";
import { SweetFilters } from "../components/SweetFilters";
import SEO from "./SEO";

export function SweetsList() {
  const {
    data = { sweets: [] },
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allSweets"],
    queryFn: fetchSweets,
  });

  const [filteredSweets, setFilteredSweets] = React.useState([]);

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-500">Failed to load sweets</p>;

  return (
    <div className="pt-18 px-10">
      <SEO title="Sweets" description="Browse our delicious sweets" image="/logo.png" />
      <h2 className="text-4xl font-bold mt-4 mb-6 text-center">Sweets</h2>

      <SweetFilters data={data.sweets} onFilteredChange={setFilteredSweets} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredSweets.length === 0 && (
          <motion.div
            className="col-span-full text-center text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            No sweets found.
          </motion.div>
        )}

        <AnimatePresence>
          {filteredSweets.map((sweet, index) => {
            let stockColor = "bg-red-400 border-red-400 text-white";
            let stockText = <>Out of Stock</>;

            if (sweet.quantity > 0 && sweet.quantity < 50) {
              stockColor = "bg-amber-500 border-amber-500 text-white";
              stockText = <>{sweet.quantity} Kg left</>;
            } else if (sweet.quantity >= 50) {
              stockColor = "bg-green-500 border-green-500 text-white";
              stockText = <>{sweet.quantity} Kg left</>;
            }

            return (
              <motion.div
                key={sweet._id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <Link
                  to={`/sweets/${sweet._id}`}
                  className="block rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition text-black"
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
                      {sweet.description || "No description available"}
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
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
