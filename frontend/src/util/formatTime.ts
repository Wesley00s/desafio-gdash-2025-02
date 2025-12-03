export const formatTime = (dateString: string): string => {
   if (!dateString) return '';

   const isoString = dateString.endsWith('Z') ? dateString : `${dateString}Z`;

   const date = new Date(isoString);

   return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
   }).format(date);
};
