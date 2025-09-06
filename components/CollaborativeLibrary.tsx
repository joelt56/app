
import React, { useState } from 'react';
import { LibraryIcon } from './icons/LibraryIcon';

export const CollaborativeLibrary: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formState, setFormState] = useState({
        title: '',
        story: '',
        author: '',
        region: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send data to a backend
        console.log('Form submitted:', formState);
        setSubmitted(true);
        setFormState({ title: '', story: '', author: '', region: '' });
        setTimeout(() => setSubmitted(false), 5000); // Reset after 5 seconds
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
            <div className="bg-nica-white rounded-2xl shadow-lg p-6 sm:p-8 border-t-4 border-nica-blue">
                <div className="flex items-center mb-4">
                    <LibraryIcon className="w-10 h-10 text-nica-blue mr-4" />
                    <h2 className="text-3xl font-bold text-nica-dark-blue font-serif">Biblioteca Colaborativa</h2>
                </div>
                <p className="text-gray-600 mb-8 max-w-3xl">
                    ¡Tu voz es parte de nuestra cultura! Comparte una historia, un recuerdo o una leyenda de tu comunidad para que juntos mantengamos viva nuestra memoria.
                </p>

                {submitted ? (
                    <div className="text-center p-8 bg-green-100 text-green-800 rounded-lg">
                        <h3 className="text-2xl font-bold">¡Gracias por tu contribución!</h3>
                        <p className="mt-2">Tu relato ha sido enviado para revisión. Juntos enriquecemos el patrimonio cultural de Nicaragua.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-lg font-medium text-gray-700">Título del Relato</label>
                            <input type="text" name="title" id="title" value={formState.title} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nica-blue focus:border-nica-blue text-lg" />
                        </div>
                        <div>
                            <label htmlFor="story" className="block text-lg font-medium text-gray-700">Tu Historia</label>
                            <textarea name="story" id="story" value={formState.story} onChange={handleChange} rows={8} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nica-blue focus:border-nica-blue text-lg"></textarea>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="author" className="block text-lg font-medium text-gray-700">Tu Nombre (o Anónimo)</label>
                                <input type="text" name="author" id="author" value={formState.author} onChange={handleChange} placeholder="Ej: Juan Pérez" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nica-blue focus:border-nica-blue text-lg" />
                            </div>
                            <div>
                                <label htmlFor="region" className="block text-lg font-medium text-gray-700">Región o Departamento</label>
                                <input type="text" name="region" id="region" value={formState.region} onChange={handleChange} placeholder="Ej: Granada" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-nica-blue focus:border-nica-blue text-lg" />
                            </div>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="inline-flex justify-center py-3 px-8 border border-transparent shadow-md text-lg font-medium rounded-md text-white bg-nica-blue hover:bg-nica-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nica-blue transition-colors duration-200">
                                Enviar Mi Historia
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
