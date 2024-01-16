export const getNames = async () => {
    return await fetch("https://retoolapi.dev/UV6PK5/data").then(
      (res) => res.json(),
    );
    
  };
  