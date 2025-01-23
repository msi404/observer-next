'use client'
import { useStats } from '@/app/_hooks/use-stats';
import { hasPermission } from '@/app/_auth/auth-rbac';
import { useSelector } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import {
	UsersRound,
	Eye,
	Codesandbox,
	Vote,
	Building2,
	Feather,
	UserRoundCheck,
	UserRoundSearch
} from 'lucide-react';
 
export const useDataCards = () =>
{
	const user = useSelector(selectUser);
	const { stats, isLoading } = useStats();
	const dataCards = [
		{
			permission: hasPermission( user, 'view:total-candidates' ),
			isLoading,
		  total: stats.candidateCount,
		  icon: <UsersRound />,
		  description: 'home:cards.totalOfCandidates'
		},
		{
			permission: hasPermission( user, 'view:total-observers' ),
			isLoading,
		  total: stats.observerCount,
		  icon: <Eye />,
		  description: 'home:cards.totalOfObservers'
		},
		{
			// @ts-ignore
			permission: hasPermission( user, 'view:total-entities' ),
			isLoading,
		  total: stats.electionEntityCount,
		  icon: <Codesandbox />,
		  description: 'home:cards.totalOfEntities'
		},
		{
			// @ts-ignore
			permission: hasPermission( user, 'view:total-polling-centers' ),
			isLoading,
		  total: stats.pollingCenterCount,
		  icon: <Vote />,
		  description: 'home:cards.totalOfPollingCenters'
		},
		{
			// @ts-ignore
			permission: hasPermission( user, 'view:total-centers' ),
			isLoading,
		  total: stats.stationCount,
		  icon: <Building2 />,
		  description: 'home:cards.totalOfStations'
		},
		{
			permission: hasPermission( user, 'view:total-data-entries' ),
			isLoading,
		  total: stats.stationCount,
		  icon: <Feather />,
		  description: 'home:cards.totalOfDataEntries'
		},
		{
			permission: hasPermission( user, 'view:total-comfirmed-voters' ),
			isLoading,
		  total: stats.voterConfirmed,
		  icon: <UserRoundCheck />,
		  description: 'home:cards.totalOfConfirmedVoters'
		},
		{
			permission: hasPermission( user, 'view:total-possible-voters' ),
			isLoading,
		  total: stats.voterPotential,
		  icon: <UserRoundSearch />,
		  description: 'home:cards.totalOfPossibleVoters'
		},
	 ]
	return {
	  dataCards
  }
}