import { Divider } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Timeline from '../components/Timeline'
import { getData } from '../services/RequestsService'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const orderBySchema = z.object({
  orderByDate: z.enum(['asc', 'desc']).optional()
});

export default function HistoryPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(orderBySchema),
    defaultValues: {
      orderByDate: 'asc',
    },
  });

  const orderBy = watch('orderByDate');

  async function fetchHistory({ orderByDate }) {
    const orderingParam = orderByDate === 'desc' ? '-created_at' : 'created_at';
    const response = await getData(`api/history?ordering=${orderingParam}`);
    return response;
  }

  const oneMinuteInMiliseconds = 1 * 1000 * 60;

  const { data, isFetched, refetch } = useQuery({
    queryKey: ['history', orderBy],
    queryFn: () => fetchHistory({ orderByDate: orderBy }),
    refetchInterval: oneMinuteInMiliseconds,
    enabled: true,
  });

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header defaultSelectedKeys="Histórico" />
        <div className="flex-1 flex-col">
          <div className="flex justify-end px-12 my-5 gap-x-10">
            <form onSubmit={handleSubmit(() => refetch())} className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Ordenar por Data:</span>
              </label>
              <select {...register('orderByDate')} className="select select-bordered">
                <option value="asc">Crescente</option>
                <option value="desc">Decrescente</option>
              </select>
              {errors.orderByDate && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.orderByDate?.message}</span>
                </label>
              )}
            </form>
          </div>
          <Divider />
          <div className="mt-10 mb-12 flex flex-col gap-10">
            {isFetched && <Timeline data={data?.results} />}
          </div>
        </div>
      </div>
    </>
  );
}