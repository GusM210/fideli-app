import { useForm } from 'react-hook-form';
import api from '../../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../../context/AuthContext';
import SelectEnterprise from '../components/Input';

const CreateCard = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm();
  const { userId } = useAuth();

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post("/card", {
        ...data,
        clienteId: userId,
      });

      if (res.status >= 200 && res.status < 300) {
        toast.success("Cadastro realizado com sucesso!");
      } else {
        toast.error(res.data.message || "Ops... algo deu errado.");
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Erro no servidor. Tente novamente."
        );
      } else if (error.request) {
        toast.error("Não foi possível se conectar ao servidor. Verifique sua conexão.");
      } else {
        toast.error("Erro desconhecido. Tente novamente.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md sm:max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Criar um cartão</h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Apelido
              </label>
              <input
                type="text"
                id="nome"
                {...register('nome', { required: true })}
                className={`block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border rounded-md shadow-sm appearance-none focus:ring-purple focus:border-purple sm:text-sm ${errors.nome ? 'border-red-500' : ''}`}
                placeholder="Digite o nome"
              />
              {errors.nome && <span className="text-red-500">Este campo é obrigatório</span>}
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                Número
              </label>
              <input
                type="text"
                id="numero"
                {...register('numero', { required: true })}
                className={`block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border rounded-md shadow-sm appearance-none focus:ring-purple focus:border-purple sm:text-sm ${errors.numero ? 'border-red-500' : ''}`}
                placeholder="Digite o número"
              />
              {errors.numero && <span className="text-red-500">Este campo é obrigatório</span>}
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="numero" className="block text-sm font-medium text-gray-700">
                Selecione a empresa
              </label>
              <SelectEnterprise
                name="empresaId"
                control={control}
                error={errors.empresaId ? 'Este campo é obrigatório' : undefined}
              />
            </div>
          </div>

          <div>
            <input
              type="submit"
              className="w-full px-4 py-2 text-white bg-purple rounded-md shadow-sm hover:bg-purple focus:ring-2 focus:ring-purple focus:ring-offset-2 focus:ring-offset-gray-100"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCard;
