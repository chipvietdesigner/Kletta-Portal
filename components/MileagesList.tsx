import React, { useState } from 'react';
import { MileageTrip } from '../types';
import { Trash, MapTrifold, PencilSimple, Car, Suitcase, ArrowsDownUp } from '@phosphor-icons/react';
import MileageMapModal from './MileageMapModal';

interface MileagesListProps {
  mileages: MileageTrip[];
}

const MileagesList: React.FC<MileagesListProps> = ({ mileages }) => {
  const [selectedTrip, setSelectedTrip] = useState<MileageTrip | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState<string | number | null>(null);

  const handleOpenMap = (trip: MileageTrip) => {
    setSelectedTrip(trip);
    setIsMapOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapOpen(false);
    setTimeout(() => setSelectedTrip(null), 300);
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' }).format(amount);

  return (
    <>
      <div className="w-full flex flex-col flex-1 overflow-hidden mt-2 border border-[#E5E7EB] rounded-xl bg-white shadow-sm">
        <div className="overflow-auto flex-1 custom-scrollbar">
          <table className="text-left table-fixed w-full border-collapse">
            <thead className="bg-[#F9FAFB] text-[#000000] sticky top-0 z-10 h-[48px]">
              <tr>
                <th className="px-4 font-medium text-[13px] w-[120px] border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-1">
                    <span>Date</span>
                    <ArrowsDownUp size={14} className="text-[#6B7280]" />
                  </div>
                </th>
                <th className="px-4 font-medium text-[13px] w-[200px] border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-1">
                    <span>From</span>
                    <ArrowsDownUp size={14} className="text-[#6B7280]" />
                  </div>
                </th>
                <th className="px-4 font-medium text-[13px] w-[200px] border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-1">
                    <span>To</span>
                    <ArrowsDownUp size={14} className="text-[#6B7280]" />
                  </div>
                </th>
                <th className="px-4 font-medium text-[13px] w-[110px] text-right border-b border-[#E5E7EB]">
                  <div className="flex items-center justify-end gap-1">
                    <span>Distance</span>
                    <ArrowsDownUp size={14} className="text-[#6B7280]" />
                  </div>
                </th>
                <th className="px-4 font-medium text-[13px] w-[100px] border-b border-[#E5E7EB]">Duration</th>
                <th className="px-4 font-medium text-[13px] w-[160px] border-b border-[#E5E7EB]">Vehicle</th>
                <th className="px-4 font-medium text-[13px] w-[180px] border-b border-[#E5E7EB]">Purpose</th>
                <th className="px-4 font-medium text-[13px] w-[120px] text-right border-b border-[#E5E7EB]">
                  <div className="flex items-center justify-end gap-1">
                    <span>Amount</span>
                    <ArrowsDownUp size={14} className="text-[#6B7280]" />
                  </div>
                </th>
                <th className="px-4 font-medium text-[13px] w-[140px] border-b border-[#E5E7EB]"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {mileages.map((trip, index) => {
                const isRowHovered = hoveredRowId === trip.id;
                const bgClass = isRowHovered ? 'bg-[#FAFAF8]' : 'bg-white';
                
                return (
                  <tr 
                    key={trip.id} 
                    className={`group transition-all h-[64px] border-b border-[#E5E7EB] last:border-0 ${bgClass}`}
                    onMouseEnter={() => setHoveredRowId(trip.id)}
                    onMouseLeave={() => setHoveredRowId(null)}
                  >
                    <td className="px-4 align-middle">
                      <div className="text-[13px] text-[#000000] font-normal">{trip.date}</div>
                      <div className="text-[11px] text-[#6B7280]">{trip.country}</div>
                    </td>
                    <td className="px-4 align-middle">
                      <div className="text-[13px] text-[#000000] font-medium truncate">{trip.startAddress}</div>
                      <div className="text-[11px] text-[#6B7280] truncate">{trip.startCityCountry}</div>
                    </td>
                    <td className="px-4 align-middle">
                      <div className="text-[13px] text-[#000000] font-medium truncate">{trip.endAddress}</div>
                      <div className="text-[11px] text-[#6B7280] truncate">{trip.endCityCountry}</div>
                    </td>
                    <td className="px-4 align-middle text-right">
                      <div className="text-[13px] text-[#000000] font-medium">{trip.distanceKm.toFixed(1)} km</div>
                    </td>
                    <td className="px-4 align-middle">
                      <div className="text-[13px] text-[#616A6B]">{trip.duration}</div>
                    </td>
                    <td className="px-4 align-middle">
                      <div className="flex items-center gap-2 text-[13px] text-[#000000]">
                        <Car size={16} className="text-[#6B7280]" />
                        <span className="truncate">{trip.vehicle}</span>
                      </div>
                    </td>
                    <td className="px-4 align-middle">
                      <div className="flex items-center gap-2 text-[13px] text-[#000000]">
                        <Suitcase size={16} className="text-[#6B7280]" />
                        <span className="truncate">{trip.drivePurpose}</span>
                      </div>
                    </td>
                    <td className="px-4 align-middle text-right">
                      <div className="text-[14px] font-bold text-[#1E6F73]">{formatCurrency(trip.claimAmount)}</div>
                    </td>
                    <td className="px-4 align-middle">
                      <div className={`flex items-center justify-end gap-1.5 transition-opacity duration-200 ${isRowHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <button 
                          onClick={() => handleOpenMap(trip)}
                          title="View map"
                          className="p-2 text-[#1E6F73] hover:bg-[#E5F1F1] rounded-lg transition-colors"
                        >
                          <MapTrifold size={18} weight="fill" />
                        </button>
                        <button 
                          title="Edit"
                          className="p-2 text-[#616A6B] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#E5E7EB]"
                        >
                          <PencilSimple size={18} />
                        </button>
                        <button 
                          title="Delete"
                          className="p-2 text-[#616A6B] hover:text-[#991B1B] hover:bg-[#FEF2F2] rounded-lg transition-colors"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-white py-3 flex justify-between items-center text-[13px] text-[#616A6B] px-6 border-t border-[#E5E7EB]">
          <div><span className="font-medium text-[#000000]">{mileages.length}</span> trips found</div>
        </div>
      </div>

      <MileageMapModal 
        isOpen={isMapOpen} 
        onClose={handleCloseMap} 
        trip={selectedTrip} 
      />
    </>
  );
};

export default MileagesList;