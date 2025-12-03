export const formatDate = (dateString: string) => {
   const isoString = dateString.endsWith('Z') ? dateString : `${dateString}Z`;

   const date = new Date(isoString);

   return new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
   }).format(date);
};
