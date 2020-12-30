import { Member, MemberId } from '@/types/member'
import { Ref, ref } from 'vue'

const defaultMembers: Member[] = [
  {
    id: 0,
    name: 'Admin',
    color: 'blueGray',
    image: ''
  },
  {
    id: 1,
    name: '2020',
    color: 'gray',
    image: require('@/assets/2020.png')
  },
  {
    id: 2,
    name: 'People',
    color: 'violet'
  },
  {
    id: 3,
    name: 'Merkel',
    color: 'cyan',
    image: require('@/assets/mutti.png')
  },
  {
    id: 4,
    name: 'Trump',
    color: 'emerald',
    image: require('@/assets/trump.png')
  },
  {
    id: 5,
    name: 'Telekom/SAP',
    color: 'amber'
  }
]
const membersRef: Ref<Member[]> = ref(defaultMembers)

const possibleColors = [
  'gray',
  'rose',
  'fuchsia',
  'violet',
  'blue',
  'cyan',
  'emerald',
  'lime',
  'amber'
]

export default function useMembers() {
  let i = defaultMembers.length + 1

  const createMember = (name: string, image?: string) => {
    const firstUnusedColor = possibleColors.find((possibleColor) => !membersRef.value.some((member) => member.color === possibleColor))
    const newMember: Member = {
      name,
      image,
      color: firstUnusedColor || 'gray',
      id: i++
    }
    membersRef.value.push(newMember)
  }

  const updateMember = (newMember: Member) => {
    const memberIndex = membersRef.value.findIndex((member) => member.id === newMember.id)
    if (!memberIndex) {
      return
    }
    membersRef.value[memberIndex] = newMember
  }

  const removeMember = (id: MemberId) => {
    if (!id) {
      return
    }
    const memberIndex = membersRef.value.findIndex((member) => member.id === id)
    membersRef.value.splice(memberIndex, 1)
  }

  const getMember = (id: MemberId): Member | undefined => {
    return membersRef.value.find((member) => member.id === id)
  }

  return {
    membersRef,
    createMember,
    updateMember,
    removeMember,
    getMember,
    possibleColors
  }
}

export type UseMembers = ReturnType<typeof useMembers>;
