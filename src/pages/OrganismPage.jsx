import AccordionComponent from "../components/Accordion"
import InputComponent from "../components/Input"
import ButtonComponent from "../components/Button"
import { toast } from "react-hot-toast"
import { postData } from "../services/RequestsService"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

const organismSchema = z.object({
  genus: z.string().min(1, "Campo obrigatório"),
  species: z.string().min(1, "Campo obrigatório"),
  abbreviation: z.string().optional().or(z.literal("")),
  infraspecificName: z.string().optional().or(z.literal("")),
  comment: z.string().optional().or(z.literal("")),
  commonName: z.string().optional().or(z.literal("")),
})

export default function OrganismPage() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(organismSchema)
	})

  const onSubmit = async (data) => {
    try {
      await postData("api/load/organism", {
        genus: data.genus,
        species: data.species,
        abbreviation: data.abbreviation,
        infraspecific_name: data.infraspecificName,
        comment: data.comment,
        common_name: data.commonName,
      })
      toast.success('Comando para cadastro de organismo enviado com sucesso!')
      reset({
        genus: "",
        species: "",
        abbreviation: "",
        infraspecificName: "",
        comment: "",
        commonName: "",
      })
    } catch {
      toast.error('Erro ao enviar comando para cadastro de organismo.')
    }
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-10 w-full">
        <AccordionComponent
          itens={[
            {
              isRequired: true,
              fields: [
                <Controller
                  key="genus"
                  name="genus"
                  control={control}
                  render={({ field }) => (
                    <InputComponent
                      {...field}
                      isRequired={true}
                      label="genus"
                      type="text"
                      isInvalid={!!errors.genus}
                      errorMessage={errors.genus?.message}
                      placeholder="Ex: Homo sapiens"
                    />
                  )}
                />, 
                <Controller
                  key="species"
                  name="species"
                  control={control}
                  render={({ field }) => (
                    <InputComponent
                      {...field}
                      isRequired={true}
                      label="species"
                      type="text"
                      isInvalid={!!errors.species}
                      errorMessage={errors.species?.message}
                      placeholder="Ex: sapiens"
                    />
                  )}
                />
              ]
            },
            {
              fields: [
                <Controller
                  key="abbreviation"
                  name="abbreviation"
                  control={control}
                  render={({ field }) => (
                    <InputComponent
                      {...field}
                      label="abbreviation"
                      type="text"
                      isInvalid={!!errors.abbreviation}
                      errorMessage={errors.abbreviation?.message}
                      placeholder="Ex: H. sapiens"
                    />
                  )}
                />, 
                <Controller
                  key="infraspecificName"
                  name="infraspecificName"
                  control={control}
                  render={({ field }) => (
                    <InputComponent
                      {...field}
                      label="infraspecific_name"
                      type="text"
                      isInvalid={!!errors.infraspecificName}
                      errorMessage={errors.infraspecificName?.message}
                      placeholder="Ex: sapiens"
                    />
                  )}
                />, 
                <Controller
                  key="comment"
                  name="comment"
                  control={control}
                  render={({ field }) => (
                    <InputComponent
                      {...field}
                      label="comment"
                      type="text"
                      isInvalid={!!errors.comment}
                      errorMessage={errors.comment?.message}
                    />
                  )}
                />, 
                <Controller
                  key="commonName"
                  name="commonName"
                  control={control}
                  render={({ field }) => (
                    <InputComponent
                      {...field}
                      label="common_name"
                      type="text"
                      isInvalid={!!errors.commonName}
                      errorMessage={errors.commonName?.message}
                    />
                  )}
                />
              ]
            },
          ]}
        />
        <div className="w-full flex flex-col items-center gap-4">
          <ButtonComponent
            text={isSubmitting ? "Enviando..." : "Confirmar"}
            icon={isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : undefined}
            color="default"
            variant="solid"
            size="md"
            onPress={undefined}
            className={`w-48 ${isSubmitting ? 'opacity-60 pointer-events-none' : ''}`}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  )
}