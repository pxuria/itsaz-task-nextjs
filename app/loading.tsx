import LoadingSpinner from "@/components/shared/LoadingSpinner";

const loading = () => {
  return (
    <div className="flex_center h-screen">
      <LoadingSpinner color="#F67C2D" size={32} />
    </div>
  );
};

export default loading;
