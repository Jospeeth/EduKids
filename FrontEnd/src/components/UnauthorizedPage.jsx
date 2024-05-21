const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Acceso no autorizado</h1>
      <p className="text-lg text-gray-700">No tienes permiso para ver esta página.</p>
    </div>
  );
};

export default UnauthorizedPage;
