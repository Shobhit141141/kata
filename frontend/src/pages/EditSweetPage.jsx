import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSweetById } from "../api/sweets";
import SweetForm from "../components/SweetForm";
import { Loader } from "@mantine/core";
import {motion} from 'framer-motion'
import SEO from "./SEO";

export default function EditSweetPage() {
  const { id } = useParams();

  const { data, error, isPending } = useQuery({
    queryKey: ["sweet", id],
    queryFn: () => fetchSweetById(id),
  });

  if (isPending) return <Loader />;
  if (error) {
    return (
      <div>
        <h2>Error Loading Sweet</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <motion.div className="pt-18 px-10 max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      
    >
      <SEO title={`Edit ${data.sweet.name}`} description={`Edit the details of ${data.sweet.name}`} image={data.sweet.imageUrl} />
      <h2 className="text-4xl font-bold mt-20 mb-8">Edit sweet</h2>
      <SweetForm sweet={data.sweet} />
    </motion.div>
  );
}
