import { createCitiesStore } from './createCitiesStore';
import { CityRepositoryImpl } from '@/core/infrastructure/repositories/CityRepositoryImpl';

export const useCitiesStore = createCitiesStore(new CityRepositoryImpl());
