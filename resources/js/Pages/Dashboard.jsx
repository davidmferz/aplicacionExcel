import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth,  caratulasConfig }) {
    // Estado para controlar la visibilidad del modal y reporte seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false);

   

    // Inicializa el formulario con useForm, manejando el estado del archivo, empresa y año
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
       
    });

    const handleFileChange = (event) => setData("file", event.target.files[0]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!data.file) {
            alert("Seleccione todos los campos obligatorios antes de enviar.");
            return;
        }

        const formData = new FormData();
        formData.append("file", data.file);

        post("/import-reports", {
            data: formData,
            onSuccess: () => {
                reset();
                alert("File uploaded and processed successfully!");
            },
            onError: (errors) => {
                console.error(errors);
                alert("There was an error processing the file.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Carga de Archivo</h2>}
        >
            <Head title="Inicio" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                           

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    

                                   

                                    <div className="flex flex-col items-start">
                                        <span className="flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Selecciona un archivo excel
                                        </span>
                                        <input
                                            className="w-full block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                            id="file_input"
                                            type="file"
                                            onChange={handleFileChange}
                                        />
                                        {errors.file && <div className="text-red-600 mt-2">{errors.file}</div>}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={processing}>
                                        {processing ? "Enviando..." : "Enviar"}
                                    </button>
                                </div>
                            </form>

                           
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}