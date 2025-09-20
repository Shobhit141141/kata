import SweetForm from "../components/SweetForm";
import { motion } from "framer-motion";
export default function AddSweetPage() {
  return (
    <motion.div
      className="pt-18 px-10 max-w-xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SEO title="Add New Sweet" description="Add a new sweet to the inventory" image="/logo.png" />
      <h2 className="text-4xl font-bold mt-4 mb-8">Add New Sweet</h2>
      <SweetForm />
    </motion.div>
  );
}
