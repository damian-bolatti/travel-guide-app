import React from 'react';
import { FlatList } from 'react-native';
import CityCard from './CityCard';
import { City } from '@/core/domain/entities/city';

interface CityListProps {
  cities: City[];
}

const CityList = ({ cities }: CityListProps) => {
  return (
    <FlatList
      data={cities}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => (
        <CityCard
          {...item}
        />
      )}
    />
  );
};

export default CityList;
