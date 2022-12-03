using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WebApi.Models
{
  public class ImageMap : IEntityTypeConfiguration<Image>
  {
    public void Configure(EntityTypeBuilder<Image> builder)
    {
      builder.ToTable("Image");

      builder.HasKey(x => x.Id);

      builder.Property(x => x.Id);

      builder.Property(x => x.Description)
      .HasMaxLength(50)
      .IsRequired();

      builder.Property(x => x.Extension)
          .HasMaxLength(4)
          .IsRequired();

      builder.Property(x => x.Length)
          .IsRequired();

      builder.Property(x => x.Picture);

      builder.Property(x => x.ContentType)
          .IsRequired()
          .HasMaxLength(20);
    }

    public static ImageMap Create() => new ImageMap();
  }
}