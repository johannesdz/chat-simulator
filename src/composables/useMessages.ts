import { Message, MessageId } from '@/types/message'
import { Member } from '@/types/member'
import { Ref, ref, computed } from 'vue'

const defaultMessages: any = [
  {
    text: '2020 has entered the chat',
    memberId: 0
  },
  {
    text: 'Hello everybody 👋',
    image: require('@/assets/group.png'),
    memberId: 1
  },
  {
    text: 'Let\'s get t his started',
    memberId: 1
  },
  {
    text: 'Welcome, 2020!',
    memberId: 2
  },
  {
    text: 'Check this out i\'v got a new virus for you guys',
    memberId: 1
  },
  {
    text: 'What? It\'s just a common flu',
    memberId: 2
  },
  {
    text: 'Just wait a little 😉',
    memberId: 1
  },
  {
    text: '...',
    memberId: 1
  },
  {
    text: 'Damn, you are right!',
    memberId: 2
  },
  {
    text: 'Ha ha!',
    memberId: 1
  },
  {
    text: 'Allright, we\'ll all stay at home now!',
    memberId: 3
  },
  {
    text: 'Come on, just drink some Disinfectants',
    memberId: 4
  },
  {
    text: 'Is there still some toilet paper?',
    memberId: 2
  },
  {
    text: '2020 left the chat',
    memberId: 0
  }
]
const messagesRef: Ref<Message[]> = ref(defaultMessages.map((message: any, i: number) => {
  return {
    ...message,
    id: i,
    order: i + 1
  }
}))

export default function useMessages() {
  let i = defaultMessages.length

  const createMessage = (text: string, image: string, member: Member) => {
    const newMessage: Message = {
      id: i++,
      text,
      image,
      order: messagesRef.value.length + 1,
      memberId: member.id
    }
    messagesRef.value.push(newMessage)
  }

  const updateMessage = (newMessage: Message) => {
    const index = messagesRef.value.findIndex((message) => message.id === newMessage.id)
    if (index < 0) {
      return
    }
    messagesRef.value[index] = newMessage
  }

  const removeMessage = (id: MessageId) => {
    const index = messagesRef.value.findIndex((message) => message.id === id)
    if (index < 0) {
      return
    }
    const message = messagesRef.value[index]
    const order = message.order
    messagesRef.value.splice(index, 1)
    messagesRef.value.forEach((message) => {
      if (message.order > order) {
        message.order = message.order - 1
      }
    })
  }

  const getMessage = (id: MessageId): Message | undefined => {
    return messagesRef.value.find((message) => message.id === id)
  }

  const sortMessages = (sourceMessage: Message, targetMessage: Message): void => {
    const sourceOrder = sourceMessage.order
    const targetOrder = targetMessage.order
    if (sourceOrder === targetOrder) {
      return
    }
    messagesRef.value.forEach((message) => {
      if (message.id === sourceMessage.id) {
        return
      }
      if (targetOrder > sourceOrder) {
        if (message.order > sourceOrder && message.order <= targetOrder) {
          message.order = message.order - 1
        }
      } else {
        if (message.order < sourceOrder && message.order > targetOrder) {
          message.order = message.order + 1
        }
      }
    })
    if (targetOrder > sourceOrder) {
      sourceMessage.order = targetOrder
    } else {
      sourceMessage.order = targetOrder + 1
    }
  }

  const sortedMessagesRef: Ref<Message[]> = computed(() => messagesRef.value.sort((a, b) => (a.order > b.order) ? 1 : -1))

  return {
    messagesRef,
    createMessage,
    updateMessage,
    removeMessage,
    getMessage,
    sortMessages,
    sortedMessagesRef
  }
}

export type UseMessages = ReturnType<typeof useMessages>;
