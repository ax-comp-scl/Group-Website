import dayjs from 'dayjs';
import { div } from 'framer-motion/client';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { deleteData } from '../services/RequestsService';
import ButtonComponent from './Button';
import ExcludeIcon from './icons/ExcludeIcon';
import ModalOption from './ModalOption';
import { useState } from 'react';
import { getUser } from '../services/userService';

function StatusIndicator({ exitCode }) {
  switch (exitCode) {
    case 0:
      return <CheckCircle2 className="w-7 h-7 text-success" />
    case 1:
      return <XCircle className="w-7 h-7 text-error" />
    default:
      return <Loader2 className="w-7 h-7 text-info animate-spin" />
  }
}

export default function TimelineCard(props) {
  const [isOptionOpen, setOptionOpen] = useState(false);
  const user = getUser();

  const handleOptionOpen = () => {
    setOptionOpen(true);
  };

  const handleExclude = async () => {
    try {
      let params = '';
      switch (props.command) {
        case 'insert_organism':
        case 'load_gff':
          params = `${props.params.genus} ${props.params.species}`;
          break;
        case 'load_relations_ontology':
        case 'load_sequence_ontology':
        case 'load_gene_ontology':
          params = props.params.common_name;
          break;
        case 'load_fasta':
          params = `${props.params.genus} ${props.params.species}`;
          break;
        default:
          return;
      }

      await deleteData(`api/load/organism/${params}`);
      props.loadData();
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
  };

  const createdAt = dayjs(props.createdAt).subtract(3, 'hours');
  const monthNameCreated = createdAt.format('MMMM'); 
  const yearCreated = createdAt.format('YYYY');     
  const dayCreated = createdAt.format('D');         
  const timeCreated = createdAt.format('HH:mm');  

  const finishedAt = dayjs(props.finishedAt).subtract(3, 'hours');
  const monthNameFinished = finishedAt.format('MMMM'); 
  const yearFinished = finishedAt.format('YYYY');     
  const dayFinished = finishedAt.format('D');         
  const timeFinished = finishedAt.format('HH:mm');   

  return (
    <div className="bg-white text-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-xl mx-auto">
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <div className="text-left">
          <h2 className="font-semibold">{dayCreated} {monthNameCreated}, {yearCreated}</h2>
          <p>{timeCreated}</p>
        </div>

        <div className="relative text-center">
          <div className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 w-full">
            <StatusIndicator exitCode={props.exitCode} />
          </div>
        </div>

        <div className="text-right">
          <h2 className="font-semibold">{dayFinished} {monthNameFinished}, {yearFinished}</h2>
          <p>{timeFinished}</p>
        </div>
      </div>

      <div className="bg-[rgb(249,249,249)] p-4 rounded-xl text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{props.command}</h3>
        <p className="text-sm text-gray-600">{props.description}</p>
        {user.is_staff && (
          props.finishedAt &&
          props.exitCode === 0 &&
          props.command === 'load_relations_ontology' || 
          props.command === 'load_sequence_ontology' || 
          props.command === 'load_gene_ontology' || 
          props.command === 'insert_organism' || 
          props.command === 'load_fasta' || 
          props.command === 'load_gff') && (
          <div className="fle mt-2">
            <ButtonComponent
              icon={<ExcludeIcon className="size-6" />}
              variant="light"
              color="danger"
              text="Excluir"
              onPress={handleOptionOpen}
            />
            <ModalOption
              isOpen={isOptionOpen}
              onOpenChange={setOptionOpen}
              handleConfirm={() => {
                handleExclude();
                setOptionOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

