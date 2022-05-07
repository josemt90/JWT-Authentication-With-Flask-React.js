"""empty message

Revision ID: 5346011c5cf2
Revises: 2807edd385a2
Create Date: 2022-03-10 18:11:10.795074

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5346011c5cf2'
down_revision = '2807edd385a2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=120), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.add_column('user', sa.Column('name', sa.String(length=120), nullable=False))
    op.add_column('user', sa.Column('role_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'user', 'role', ['role_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'user', type_='foreignkey')
    op.drop_column('user', 'role_id')
    op.drop_column('user', 'name')
    op.drop_table('role')
    # ### end Alembic commands ###
